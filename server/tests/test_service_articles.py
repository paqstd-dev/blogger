import pytest
from fastapi.testclient import TestClient

from app.messages import UNAUTHORIZED


TEST_ARTICLES = [
    {"slug": "first", "title": "First!", "description": "Im description", "content": "Simple content with <p>tag</p>"},
    {"slug": "second", "title": "Second!", "description": "Im description too", "content": "..."},
    {"slug": "custom-title", "title": "Custom title", "description": "...", "content": ""}
]

PAGE = 0
PER_PAGE = 3


@pytest.fixture(scope="module", name="x_auth_token")
def get_x_auth_token(client: TestClient):
    user_object = {
        "username": "other-test-user",
        "password": "other-test-user-password"
    }
    create = client.post("/users/create", json=user_object)
    create_data = create.json()

    assert create.status_code == 201
    assert create_data["username"] == user_object["username"]

    authorize = client.post("/users/authorize", json=user_object)
    authorize_data = authorize.json()

    assert authorize.status_code == 200
    assert authorize_data.get("auth_token") is not None

    return authorize_data["auth_token"]


@pytest.fixture(scope="module", name="x_auth_token_other_user")
def get_x_auth_token_other_user(client: TestClient):
    user_object = {
        "username": "other-test-user-1",
        "password": "other-test-user-password-1"
    }
    create = client.post("/users/create", json=user_object)
    create_data = create.json()

    assert create.status_code == 201
    assert create_data["username"] == user_object["username"]

    authorize = client.post("/users/authorize", json=user_object)
    authorize_data = authorize.json()

    assert authorize.status_code == 200
    assert authorize_data.get("auth_token") is not None

    return authorize_data["auth_token"]


def test_create_article_without_token(client: TestClient):
    response = client.post("/articles/create", json=TEST_ARTICLES[0])
    data = response.json()

    assert response.status_code == 401
    assert data["detail"] == UNAUTHORIZED


def test_create_articles_success(client: TestClient, x_auth_token: get_x_auth_token):
    for article in TEST_ARTICLES:
        response = client.post("/articles/create", json=article, headers={
            "X-Auth-Token": x_auth_token
        })
        data = response.json()

        assert response.status_code == 201
        assert data["slug"] == article["slug"]


def test_create_article_safe_unique(client: TestClient, x_auth_token: get_x_auth_token):
    response = client.post("/articles/create", json=TEST_ARTICLES[0], headers={
        "X-Auth-Token": x_auth_token
    })
    data = response.json()

    assert response.status_code == 201
    assert data["slug"][:-1] == TEST_ARTICLES[0]["slug"]


def test_list_articles(client: TestClient):
    response = client.get("/articles", params={"page": PAGE, "per_page": PER_PAGE})
    data = response.json()

    assert response.status_code == 200

    for created_article, test_article in zip(data, TEST_ARTICLES):
        assert created_article["slug"] == test_article["slug"]
        assert created_article["title"] == test_article["title"]
        assert created_article["description"] == test_article["description"]

        assert created_article.get("content") is None
        assert created_article.get("user") is not None


def test_articles_pagination_success(client: TestClient):
    response = client.get("/articles", params={"page": PAGE + 1, "per_page": PER_PAGE})
    data = response.json()

    assert response.status_code == 200
    assert len(data) == 1
    assert data[0]["slug"][:-1] == TEST_ARTICLES[0]["slug"]


def test_articles_pagination_missing_pagination_params(client: TestClient):
    response = client.get("/articles", params={"page": PAGE})
    data = response.json()

    assert response.status_code == 422
    assert data["detail"][0]["loc"][-1] == "per_page" and data["detail"][0]["type"] == "value_error.missing"

    response = client.get("/articles", params={"per_page": PER_PAGE})
    data = response.json()

    assert response.status_code == 422
    assert data["detail"][0]["loc"][-1] == "page" and data["detail"][0]["type"] == "value_error.missing"


def test_article_by_slug(client: TestClient):
    for test_article in TEST_ARTICLES:
        response = client.get(f"/articles/{test_article['slug']}")
        created_article = response.json()

        assert response.status_code == 200
        assert created_article["slug"] == test_article["slug"]
        assert created_article["title"] == test_article["title"]
        assert created_article["content"] == test_article["content"]
        assert created_article.get("description") is None


def test_article_by_slug_not_found(client: TestClient):
    response = client.get("/articles/not-found")

    assert response.status_code == 404


def test_article_update_not_found(client: TestClient, x_auth_token_other_user: get_x_auth_token_other_user):
    response = client.put(f"/articles/{TEST_ARTICLES[0]['slug']}", json={
        "title": TEST_ARTICLES[0]["title"] + "-updated"
    }, headers={
        "X-Auth-Token": x_auth_token_other_user
    })

    assert response.status_code == 404


def test_article_success(client: TestClient, x_auth_token: get_x_auth_token):
    update_title = TEST_ARTICLES[0]["title"] + "-updated"
    response = client.put(f"/articles/{TEST_ARTICLES[0]['slug']}", json={
        "title": update_title
    }, headers={
        "X-Auth-Token": x_auth_token
    })
    data = response.json()

    assert response.status_code == 200
    assert data["slug"] == TEST_ARTICLES[0]['slug']

    # check updated data
    response = client.get(f"/articles/{TEST_ARTICLES[0]['slug']}")
    data = response.json()

    assert response.status_code == 200
    assert data["title"] == update_title


def test_article_delete_not_found(client: TestClient, x_auth_token_other_user: get_x_auth_token_other_user):
    response = client.delete(f"/articles/{TEST_ARTICLES[0]['slug']}", headers={
        "X-Auth-Token": x_auth_token_other_user
    })

    assert response.status_code == 404


def test_article_delete_success(client: TestClient, x_auth_token: get_x_auth_token):
    response = client.delete(f"/articles/{TEST_ARTICLES[0]['slug']}", headers={
        "X-Auth-Token": x_auth_token
    })
    assert response.status_code == 204

    # check slug
    response = client.get(f"/articles/{TEST_ARTICLES[0]['slug']}")
    assert response.status_code == 404

    # check list
    response = client.get(f"/articles", params={"page": PAGE, "per_page": PER_PAGE})
    assert response.status_code == 200

    data = response.json()

    for article in data:
        assert article["slug"] != TEST_ARTICLES[0]['slug']
