import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="page page-center">
      <div className="container-tight py-4">
        <div className="empty">
          <div className="empty-header">404</div>
          <p className="empty-title">Мы не нашли такую страницу!</p>
          <p className="empty-subtitle text-muted">
            Попробуйте проверить ваш запрос и повторите попытку...
          </p>
          <div className="empty-action">
            <Link to="/" className="btn btn-primary">
              На главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
