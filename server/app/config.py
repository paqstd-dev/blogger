import os


SECRET_KEY = os.environ.get("SECRET_KEY", "secret_key")

# user service
USERNAME_MIN_LENGTH = 4
PASSWORD_MIN_LENGTH = 8

# article service
TITLE_MAX_LENGTH = 255
DESCRIPTION_MAX_LENGTH = 255
CONTENT_MAX_LENGTH = 10_000
