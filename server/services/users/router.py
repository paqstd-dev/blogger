import hashlib
import jwt
from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select

from app.config import SECRET_KEY
from .models import User, Token, UserRead

from app.dependencies import get_session
from .dependencies import get_current_user


router = APIRouter()


@router.post("/create")
def create_user(*, session=Depends(get_session), user: User):
    if session.exec(select(User).where(User.username == user.username)).one_or_none():
        raise HTTPException(status_code=400, detail="Username already existed!")

    hashed_password = hashlib.sha512((user.password + SECRET_KEY).encode("utf-8")).hexdigest()

    session.add(User(username=user.username, password=hashed_password))
    session.commit()

    return 201


@router.post("/authorize")
def authorize_user(*, session = Depends(get_session), user: User):
    hashed_password = hashlib.sha512((user.password + SECRET_KEY).encode("utf-8")).hexdigest()

    if not (existed_user := session.exec(select(User).where(User.username == user.username, User.password == hashed_password)).one_or_none()):
        raise HTTPException(status_code=400, detail="Username or password is incorrect!")

    # create user token
    issued = int(datetime.now().timestamp())
    expire = issued + 60 * 60 * 24

    auth_token = jwt.encode({
        "iss": "microservice-users",
        "uid": existed_user.id,
        "iat": issued,
        "exp": expire
    }, SECRET_KEY, algorithm="HS256")

    session.add(Token(auth_token=auth_token))
    session.commit()

    return {
        "auth_token": auth_token,
        "expire": expire
    }


@router.post("/verify", response_model=UserRead)
def check_token(*, current_user = Depends(get_current_user)):
    return current_user
