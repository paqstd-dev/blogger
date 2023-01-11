import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signinStore, signinAccount } from "features/account";
import { IconEye, IconEyeOff } from "@tabler/icons";

export default function Signin() {
  const { register, handleSubmit } = useForm();

  // toggles
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (form) => {
    setError(false);

    signinAccount(form)
      .then((response) => {
        dispatch(signinStore(response.auth_token));
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
                    {...register("username", { required: true })}
                    type="text"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Пароль</label>
                  <div className="input-group input-group-flat">
                    <input
                      {...register("password", { required: true })}
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      autoComplete="off"
                    />
                    <span className="input-group-text">
                      <a
                        onClick={toggleShowPassword}
                        className="link-secondary"
                        data-bs-toggle="tooltip"
                        aria-label="Show password"
                        data-bs-original-title="Show password"
                      >
                        {!showPassword ? <IconEye /> : <IconEyeOff />}
                      </a>
                    </span>
                  </div>
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
