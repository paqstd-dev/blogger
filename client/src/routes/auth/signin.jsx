import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signinStore, signinAction } from "../../features/account";
import { IconEye, IconEyeOff } from "@tabler/icons";

export default function Signin() {
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (form) => {
    signinAction(form).then((response) => {
      dispatch(signinStore(response.auth_token));
      navigate("/");
    });
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div className="page page-center">
        <div className="container container-tight py-4">
          <div className="card card-md">
            <div className="card-body">
              <h2 className="h2 text-center mb-4">Войдите в аккаунт</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="form-footer">
                  <button type="submit" className="btn btn-primary w-100">
                    Продолжить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
