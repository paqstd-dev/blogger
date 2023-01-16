import pytest
from fastapi.testclient import TestClient

from sqlmodel import Session, SQLModel, create_engine

from main import app
from app.dependencies import get_session


@pytest.fixture(scope="session", name="session")
def session_fixture():
    engine = create_engine(
        "sqlite:///testing.db", connect_args={"check_same_thread": False},
    )

    SQLModel.metadata.create_all(engine)

    with Session(engine) as session:
        yield session

    SQLModel.metadata.drop_all(engine)


@pytest.fixture(scope="session", name="client")
def client_fixture(session: Session):
    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()
