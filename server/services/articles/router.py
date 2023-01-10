import string
import random
from slugify import slugify
from typing import List, Any
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select

from database import engine
from .models import Article

# import from other service
from services.users.dependencies import User, get_current_user


router = APIRouter()


@router.get("/")
def get_list_articles() -> List[Article]:
    with Session(engine) as session:
        return session.exec(select(Article)).all()


@router.get("/{article_slug}")
def get_article_by_slug(article_slug: str) -> Article | Any:
    with Session(engine) as session:
        if not (article := session.exec(select(Article).where(Article.slug == article_slug)).one_or_none()):
            raise HTTPException(status_code=404, detail="Not Found!")

        return article


@router.post("/create", status_code=201)
def create_article(article: Article, current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        article.slug = slugify(article.title)
        article.user_id = current_user.id

        # check current slug in db?
        checks = 0
        while checks < 10:
            if session.exec(select(Article).where(Article.slug == article.slug)).one_or_none():
                article.slug += random.sample((string.ascii_lowercase + string.digits + "-_"), 1)
            else:
                break
        else:
            raise HTTPException(status_code=400, detail="The system has a lot of articles with a similar title. Try changing and retry the request!")

        session.add(article)
        session.commit()

        return {
            "slug": article.slug
        }


@router.put("/{article_slug}")
def update_article_by_slug(article_slug: str, article: Article, current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        if not (selected_article := session.exec(select(Article).where(Article.slug == article_slug, Article.user_id == current_user.id)).one_or_none()):
            raise HTTPException(status_code=404, detail="Not Found!")

        selected_article.title = article.title
        selected_article.content = article.content

        session.add(selected_article)
        session.commit()

        return {
            "slug": selected_article.slug
        }


@router.delete("/{article_slug}", status_code=204)
def delete_article_by_slug(article_slug: str, current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        if not (selected_article := session.exec(select(Article).where(Article.slug == article_slug, Article.user_id == current_user.id)).one_or_none()):
            raise HTTPException(status_code=404, detail="Not Found!")

        session.delete(selected_article)
        session.commit()
