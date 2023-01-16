from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime

from services.users.models import User, UserRead


class ArticleBase(SQLModel):
    slug: str = Field(index=True, nullable=True, default=None, unique=True)
    title: str

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")


class WithDateTime(SQLModel):
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class ArticleRead(ArticleBase, WithDateTime):
    user: Optional["UserRead"] = None
    content: str


class ArticleList(ArticleBase, WithDateTime):
    user: Optional["UserRead"] = None
    description: str = None


class ArticleCreate(ArticleList):
    content: str


class Article(ArticleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: Optional[User] = Relationship(back_populates="articles")
    description: str = None
    content: str

    created_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    updated_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), onupdate=func.now())
    )


class ArticleUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
