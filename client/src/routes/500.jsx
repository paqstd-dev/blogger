import { Link } from "react-router-dom";

export default function Page500() {
  return (
    <div className="page page-center">
      <div className="container-tight py-4">
        <div className="empty">
          <div className="empty-header">500</div>
          <p className="empty-title">Произошла ошибка!</p>
          <p className="empty-subtitle text-muted">
            Мы получили уведомление об этом и уже работаем над исправлением.
            Пожалуйста повторите ваш запрос позднее.
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
