import { useNavigate, useParams } from "react-router-dom";
import {
  ArticleForm,
  getArticleBySlug,
  updateArticle,
} from "features/articles";
import { useEffect, useState } from "react";
import BaseLayout from "layouts/BaseLayout";
import Loading from "components/Loader";

export default function UpdateArticle() {
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(
    () => async () => {
      const response = await getArticleBySlug(slug);

      setArticle(response);
    },
    []
  );

  const onSubmit = async (form) => {
    const response = await updateArticle(slug, form);

    if (!!response?.slug) {
      navigate("/blog/articles");
    }
  };

  return (
    <BaseLayout
      header={{
        pretitle: "Статьи",
        title: "Создание статьи",
      }}
    >
      {article === null ? (
        <Loading />
      ) : (
        <ArticleForm data={article} onSubmit={onSubmit} />
      )}
    </BaseLayout>
  );
}
