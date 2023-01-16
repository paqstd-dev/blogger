from fastapi.testclient import TestClient

from app.config import USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH


TEST_USER = {
    "username": "test-user",
    "password": "test-user-password"
}


def test_create_success(client: TestClient):
    response = client.post("/users/create", json=TEST_USER)
    data = response.json()

    assert response.status_code == 201
    assert data["username"] == TEST_USER["username"]


def test_create_already_exist(client: TestClient):
    response = client.post("/users/create", json=TEST_USER)
    data = response.json()

    assert response.status_code == 400
    assert data["detail"] == "Username already existed!"


def test_create_missing_field(client: TestClient):
    response = client.post("/users/create", json={"username": TEST_USER["username"]})
    data = response.json()

    assert response.status_code == 422
    assert data["detail"][0]["type"] == "value_error.missing"


def test_create_username_length(client: TestClient):
    response = client.post("/users/create", json={**TEST_USER, "username": TEST_USER["username"][:USERNAME_MIN_LENGTH - 1]})
    data = response.json()

    assert response.status_code == 422
    assert data["detail"][0]["type"] == "value_error.any_str.min_length"


def test_create_password_length(client: TestClient):
    response = client.post("/users/create", json={**TEST_USER, "password": TEST_USER["password"][:PASSWORD_MIN_LENGTH - 1]})
    data = response.json()

    assert response.status_code == 422
    assert data["detail"][0]["type"] == "value_error.any_str.min_length"


def test_authorize_success(client: TestClient):
    response = client.post("/users/authorize", json=TEST_USER)
    data = response.json()

    assert response.status_code == 200
    assert data.get("auth_token") is not None


def test_authorize_incorrect(client: TestClient):
    response = client.post("/users/authorize", json={"username": TEST_USER["password"], "password": TEST_USER["username"]})
    data = response.json()

    assert response.status_code == 400
    assert data["detail"] == "Username or password is incorrect!"


def test_verify_success(client: TestClient):
    # authorize for getting authToken
    authorize = client.post("/users/authorize", json=TEST_USER)
    assert authorize.status_code == 200

    # send verify with token
    response = client.post("/users/verify", headers={
        "X-Auth-Token": authorize.json()["auth_token"]
    })
    data = response.json()

    assert response.status_code == 200
    assert data["username"] == TEST_USER["username"]


def test_verify_not_authorized(client: TestClient):
    response = client.post("/users/verify")
    data = response.json()

    assert response.status_code == 401
    assert data["detail"] == "Unauthorized!"


def test_verify_invalid_token(client: TestClient):
    response = client.post("/users/verify", headers={
        "X-Auth-Token": "invalid-token"
    })
    data = response.json()

    assert response.status_code == 401
    assert data["detail"] == "Token is invalid!"
