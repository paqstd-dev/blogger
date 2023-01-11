import jwt
from typing import Any
from fastapi import Header, HTTPException, Depends
from sqlmodel import select

from app.config import SECRET_KEY
from app.dependencies import get_session
from .models import Token, User


def get_current_user(*, session = Depends(get_session), x_auth_token: str = Header(default=None)) -> User | Any:
    # check exist token in db?
    if not (exist_token := session.exec(select(Token).where(Token.auth_token == x_auth_token)).one_or_none()):
        raise HTTPException(status_code=400, detail="Auth token is incorrect!")

    # check expire date for token
    try:
        decoded_token = jwt.decode(exist_token.auth_token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="Token is expired!")

    # find user in db
    if not (existed_user := session.exec(select(User).where(User.id == decoded_token["uid"])).one_or_none()):
        raise HTTPException(status_code=400, detail="User not found!")

    return existed_user
