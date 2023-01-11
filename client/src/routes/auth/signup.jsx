import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupAccount } from "features/account";
import { IconEye, IconEyeOff } from "@tabler/icons";

export default function Signup() {
  const { register, handleSubmit } = useForm();

  // toggles
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
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
