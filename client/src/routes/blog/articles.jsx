import { useState, useEffect } from "react";
import { ArticleCard, getArticlesList } from "features/articles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BaseLayout from "layouts/BaseLayout";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  const { authorized } = useSelector(({ account }) => account);

  useEffect(
    () => async () => {
      const response = await getArticlesList();

      setArticles(response);
    },
    []
  );

  return (
    <BaseLayout
      header={{
        pretitle: "Статьи",
        title: "Все статьи",
        content: (
          <>
            {authorized ? (
              <Link to="/blog/create" className="btn btn-primary">
                Создать статью
              </Link>
            ) : (
              <div className="alert alert-warning mb-0">
                Чтобы создать статью необходимо{" "}
                <Link to="/auth/signin">авторизоваться</Link>
              </div>
            )}
          </>
        ),
      }}
    >
      <div className="row row-deck">
        {articles.map((article, index) => (
          <div className="col-lg-4 mb-3" key={index}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </BaseLayout>
  );
}
