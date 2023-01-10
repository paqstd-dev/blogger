from typing import Optional

from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    password: str


class UserResponse(SQLModel):
    id: int
    username: str


class Token(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    auth_token: str
