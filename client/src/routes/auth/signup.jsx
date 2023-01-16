import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupAccount } from "features/account";
import { USERNAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from "config";
import cn from "classnames";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (form) => {
    setError(false);

    signupAccount(form)
      .then(() => {
        navigate("/auth/signin");
      })
      .catch(() => setError(true));
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="page page-center">
        <div className="container container-tight py-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title h2">Регистрация</h3>
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
                    Произошла ошибка! Попробуйте еще раз.
                  </div>
                )}

                <Link to="/auth/signin">У меня уже есть аккаунт</Link>
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
