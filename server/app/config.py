import os
from uuid import uuid4


SECRET_KEY = os.environ.get("SECRET_KEY", str(uuid4()))
