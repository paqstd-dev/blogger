from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel
from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime


class Article(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    # microservice-users/models
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")

    slug: str = Field(index=True, nullable=True, default=None, unique=True)
    title: str
    description: str = None
    content: str
    created_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    updated_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), onupdate=func.now())
    )
