import { useState, useEffect } from "react";
import { ArticleCard, getArticlesList } from "features/articles";
import BaseLayout from "layouts/BaseLayout";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(
    () => async () => {
      const response = await getArticlesList();

      setArticles(response);
    },
    []
  );

  return (
    <BaseLayout>
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <ArticleCard {...article} />
          </div>
        ))}
      </div>
    </BaseLayout>
  );
}
