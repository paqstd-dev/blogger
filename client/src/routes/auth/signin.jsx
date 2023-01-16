import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signinStore, signinAccount } from "features/account";
import { USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from "config";
import cn from "classnames";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (form) => {
    setError(false);

    signinAccount(form)
      .then(({ data }) => {
        dispatch(signinStore(data.auth_token));
        navigate("/");
      })
      .catch(() => setError(true));
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="page page-center">
        <div className="container container-tight py-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title h2">Авторизация</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Имя пользователя</label>
                  <input
                    type="text"
                    className={cn("form-control", {
                      "is-invalid": !!errors.username,
                    })}
                    autoComplete="off"
                    {...register("username", {
                      required: true,
                      minLength: USERNAME_MIN_LENGTH,
                    })}
                  />
                  {!!errors.username && (
                    <div className="invalid-feedback">
                      {errors.username.type == "required" && "Поле обязательно"}
                      {errors.username.type == "minLength" &&
                        `Имя пользователя должно быть больше ${USERNAME_MIN_LENGTH} символов`}
                    </div>
                  )}
                </div>

                <div className="mb-2">
                  <label className="form-label">Пароль</label>
                  <input
                    type="password"
                    className={cn("form-control", {
                      "is-invalid": !!errors.password,
                    })}
                    autoComplete="off"
                    {...register("password", {
                      required: true,
                      minLength: PASSWORD_MIN_LENGTH,
                    })}
                  />

                  {!!errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.type == "required" && "Поле обязательно"}
                      {errors.password.type == "minLength" &&
                        `Пароль должен быть больше ${PASSWORD_MIN_LENGTH} символов`}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="alert alert-danger">
                    Имя пользователя или пароль указан неправильно! Повторите
                    попытку.
                  </div>
                )}

                <Link to="/auth/signup">У меня еще нет аккаунта</Link>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <Link to="/" className="btn">
                  Назад
                </Link>

                <button type="submit" className="btn btn-primary">
                  Продолжить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
