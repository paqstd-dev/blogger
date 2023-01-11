from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel, Relationship
from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime

from services.users.models import User, UserRead


class ArticleBase(SQLModel):
    slug: str = Field(index=True, nullable=True, default=None, unique=True)
    title: str
    description: str = None
    content: str

    user_id: Optional[int] = Field(default=None, foreign_key="user.id")


class Article(ArticleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user: Optional[User] = Relationship(back_populates="articles")

    created_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    updated_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), onupdate=func.now())
    )


class ArticleCreate(ArticleBase):
    pass


class ArticleUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None


class ArticleRead(ArticleBase):
    id: int
    user: Optional["UserRead"] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
