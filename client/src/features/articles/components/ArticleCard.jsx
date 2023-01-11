import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "lib/moment";

export function ArticleCard({
  // image,
  title,
  description,
  slug,
  user,
  created_at,
}) {
  const { authorized, username } = useSelector(({ account }) => account);

  return (
    <div className="card">
      <img />

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p>Автор @{user.username}</p>

        <p className="text-muted">{description}</p>
      </div>

      <div className="card-footer">
        <div className="d-flex justify-content-between align-items-center">
          <div>{moment(created_at).fromNow()}</div>

          <div className="btn-list">
            {authorized && user.username === username && (
              <Link to={`/blog/update/${slug}`} className="btn">
                Изменить
              </Link>
            )}

            <Link to={`/blog/articles/${slug}`} className="btn">
              Читать
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
