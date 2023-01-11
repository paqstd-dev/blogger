import BaseLayout from "layouts/BaseLayout";
import moment from "lib/moment";
import { useEffect, useState } from "react";
import { getArticleBySlug } from "features/articles";
import Loading from "components/Loader";
import { useParams } from "react-router-dom";

export default function Article() {
  const [article, setArticle] = useState(null);

  const { slug } = useParams();

  useEffect(
    () => async () => {
      const response = await getArticleBySlug(slug);

      setArticle(response);
    },
    []
  );

  return (
    <BaseLayout>
      {article === null ? (
        <Loading />
      ) : (
        <div className="card">
          <div className="card-body">
            <h2 className="blog-post-title">{article.title}</h2>
            <p className="blog-post-meta">
              {moment(article.created_at).fromNow()}, @{article.user.username}
            </p>

            <p>{article.content}</p>
          </div>
        </div>
      )}
    </BaseLayout>
  );
}
