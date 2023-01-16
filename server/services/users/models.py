from typing import TYPE_CHECKING, Optional, List
from sqlmodel import Field, SQLModel, Relationship

from app.config import USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH


if TYPE_CHECKING:
    from services.articles.models import Article


class UserBase(SQLModel):
    username: str = Field(index=True, min_length=USERNAME_MIN_LENGTH)


class UserForm(UserBase):
    password: str = Field(min_length=PASSWORD_MIN_LENGTH)


class User(UserForm, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    articles:  List["Article"] = Relationship(back_populates="user")


class UserRead(UserBase):
    pass


class Token(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    auth_token: str
