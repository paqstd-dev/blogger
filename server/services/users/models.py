from typing import TYPE_CHECKING, Optional, List
from sqlmodel import Field, SQLModel, Relationship


if TYPE_CHECKING:
    from services.articles.models import Article


class UserBase(SQLModel):
    username: str = Field(index=True)


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    password: str

    articles:  List["Article"] = Relationship(back_populates="user")


class UserRead(UserBase):
    pass


class Token(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    auth_token: str
