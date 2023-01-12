# Blogger (FastAPI + React)

## Install
### Download project
```
> git clone <project>
> cd <project>
```

### Client
In first terminal window run:
```
> cd client
> npm i
> npm run build && npm run preview
```
Now installed client (react) packages, builed dist folder and started "preview" vite server.

### Server
In second terminal window run:
```
> cd server
> python -m venv venv && source venv/bin/activate
> pip install -r requirements.txt
> uvicorn main:app
```
Now created virtual environ, installed python packages and started uvicorn server with fastapi main application.

## How it work?
### Authorization user
During authorization, a special token is created, which has a limited lifetime. All requests are used with this token.
Embedded services use the token to validate the user.

### Articles
Each authorized user can publish articles. There is a general directory of articles.
Perhaps in the future a verification mechanism (moderation) will be developed.
