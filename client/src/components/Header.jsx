import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutStore } from "../features/account";
import cn from "classnames";

export default function Header({ logo, links }) {
  const { authorized, username } = useSelector(({ account }) => account);

  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <header className="navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
          aria-controls="navbar-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          {logo}
        </h1>

        <div className="navbar-nav flex-row order-md-last">
          {authorized ? (
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span className="avatar avatar-sm">{username?.[0]}</span>
                <div className="d-none d-xl-block ps-2">
                  <div>{username}</div>
                </div>
              </a>

              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <button
                  className="dropdown-item"
                  onClick={() => dispatch(logoutStore())}
                >
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          ) : (
            <div className="nav-item">
              <Link to="/auth/signin" className="nav-link">
                Войти в аккаунт
              </Link>
            </div>
          )}
        </div>

        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul className="navbar-nav">
              {links.map(({ icon, link, equal, label }, index) => (
                <li
                  className={cn("nav-item", {
                    active: equal
                      ? link === location.pathname
                      : location.pathname.startsWith(link),
                  })}
                  key={index}
                >
                  <Link className="nav-link" to={link}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      {icon}
                    </span>
                    <span className="nav-link-title">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
