import hashlib
import jwt
from datetime import datetime

from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select

from .database import engine
from .models import User, Token, UserResponse


router = APIRouter()


SECRET_KEY = "1234_1234"


@router.post("/create")
def create_user(user: User):
    with Session(engine) as session:
        if session.exec(select(User).where(User.username == user.username)).one_or_none():
            raise HTTPException(status_code=400, detail="Username already existed!")

        hashed_password = hashlib.sha512((user.password + SECRET_KEY).encode("utf-8")).hexdigest()

        session.add(User(username=user.username, password=hashed_password))
        session.commit()

        return 201


@router.post("/authorize")
def authorize_user(user: User):
    with Session(engine) as session:
        hashed_password = hashlib.sha512((user.password + SECRET_KEY).encode("utf-8")).hexdigest()

        if not (existed_user := session.exec(select(User).where(User.username == user.username, User.password == hashed_password)).one_or_none()):
            raise HTTPException(status_code=400, detail="Username or password is incorrect!")

        # create user token
        issued = int(datetime.now().strftime("%s"))
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


@router.post("/verify", response_model=UserResponse)
def check_token(token: Token):
    with Session(engine) as session:
        # check exist token in db?
        if not (exist_token := session.exec(select(Token).where(Token.auth_token == token.auth_token)).one_or_none()):
            raise HTTPException(status_code=400, detail="Auth token is incorrect!")

        # check expire date for token
        decoded_token = jwt.decode(exist_token.auth_token, SECRET_KEY, algorithms=["HS256"])
        if decoded_token["exp"] < int(datetime.now().strftime("%s")):
            raise HTTPException(status_code=401, detail="Autho token is expired!")

        # find user in db
        if not (existed_user := session.exec(select(User).where(User.id == decoded_token["uid"])).one_or_none()):
            raise HTTPException(status_code=400, detail="User not found!")

        return existed_user
