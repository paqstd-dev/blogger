import hashlib
from app.config import SECRET_KEY


def hashing_password(password):
    return hashlib.sha512((password + SECRET_KEY).encode("utf-8")).hexdigest()
