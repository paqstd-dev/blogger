import string
import random
from slugify import slugify
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select

from .models import Article, ArticleRead, ArticleCreate, ArticleUpdate
from app.dependencies import get_session
from services.users.dependencies import User, get_current_user


router = APIRouter()


@router.get("/", response_model = List[ArticleRead])
def get_list_articles(*, session = Depends(get_session)):
    return session.exec(select(Article)).all()


@router.get("/{article_slug}", response_model = ArticleRead)
def get_article_by_slug(*, session=Depends(get_session), article_slug: str):
    if not (article := session.exec(select(Article).where(Article.slug == article_slug)).one_or_none()):
        raise HTTPException(status_code=404, detail="Not Found!")

    return article


@router.post("/create", status_code=201)
def create_article(*, session = Depends(get_session), article: ArticleCreate, current_user: User = Depends(get_current_user)):
    db_article = Article.from_orm(article)
    db_article.slug = slugify(article.title)
    db_article.user_id = current_user.id

    # check current slug in db?
    checks = 0
    while checks < 10:
        if session.exec(select(Article).where(Article.slug == db_article.slug)).one_or_none():
            db_article.slug += random.sample((string.ascii_lowercase + string.digits + "-_"), 1)[0]
        else:
            break
    else:
        raise HTTPException(status_code=400, detail="The system has a lot of articles with a similar title. Try changing and retry the request!")

    session.add(db_article)
    session.commit()

    return {
        "slug": db_article.slug
    }


@router.put("/{article_slug}")
def update_article_by_slug(*, session = Depends(get_session), article_slug: str, article: ArticleUpdate, current_user: User = Depends(get_current_user)):
    if not (db_article := session.exec(select(Article).where(Article.slug == article_slug, Article.user_id == current_user.id)).one_or_none()):
        raise HTTPException(status_code=404, detail="Not Found!")

    article_data = article.dict(exclude_unset=True)
    for key, value in article_data.items():
        setattr(db_article, key, value)

    session.add(db_article)
    session.commit()

    return {
        "slug": db_article.slug
    }


@router.delete("/{article_slug}", status_code=204)
def delete_article_by_slug(*, session=Depends(get_session), article_slug: str, current_user: User = Depends(get_current_user)):
    if not (selected_article := session.exec(select(Article).where(Article.slug == article_slug, Article.user_id == current_user.id)).one_or_none()):
        raise HTTPException(status_code=404, detail="Not Found!")

    session.delete(selected_article)
    session.commit()
