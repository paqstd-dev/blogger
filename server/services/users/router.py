import jwt
from uuid import uuid4
from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select

from app.config import SECRET_KEY
from .models import User, Token, UserForm, UserRead
from .helpers import hashing_password

from app.dependencies import get_session
from .dependencies import get_current_user


router = APIRouter()


@router.post("/create", status_code=201, response_model=UserRead)
def create_user(*, session=Depends(get_session), user: UserForm):
    if session.exec(select(User).where(User.username == user.username)).one_or_none():
        raise HTTPException(status_code=400, detail="Username already existed!")

    hashed_password = hashing_password(user.password)

    user = User(username=user.username, password=hashed_password)

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.post("/authorize")
def authorize_user(*, session = Depends(get_session), user: UserForm):
    hashed_password = hashing_password(user.password)

    if not (existed_user := session.exec(select(User).where(User.username == user.username, User.password == hashed_password)).one_or_none()):
        raise HTTPException(status_code=400, detail="Username or password is incorrect!")

    # create user token
    issued = int(datetime.now().timestamp())
    expire = issued + 60 * 60 * 24

    auth_token = jwt.encode({
        "iss": "service-users",
        "uid": existed_user.id,
        "unq": str(uuid4()),
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
