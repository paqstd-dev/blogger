import { useEffect, useState } from "react";
import { getArticleBySlug } from "features/articles";
import { Link, useParams } from "react-router-dom";
import BaseLayout from "layouts/BaseLayout";
import moment from "lib/moment";
import Loading from "components/Loader";

export default function Article() {
  const [article, setArticle] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    getArticleBySlug(slug).then(({ data }) => setArticle(data));
  }, []);

  return (
    <BaseLayout header={{ pretitle: "Статьи", title: "Просмотр статьи" }}>
      {article === null ? (
        <Loading />
      ) : (
        <>
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="blog-post-title">{article.title}</h2>
              <p className="blog-post-meta">
                {moment(article.created_at).fromNow()}, @{article.user.username}
              </p>

              {/* if empty show alert */}
              {article.content !== "<p></p>" ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                />
              ) : (
                <div className="alert alert-warning">
                  Похоже, контент еще не был добавлен...
                </div>
              )}
            </div>
          </div>

          <Link to="/blog/articles" className="btn">
            Назад к просмотру статей
          </Link>
        </>
      )}
    </BaseLayout>
  );
}
