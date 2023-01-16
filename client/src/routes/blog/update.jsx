import { useNavigate, useParams } from "react-router-dom";
import {
  ArticleForm,
  getArticleBySlug,
  updateArticle,
  deleteArticle,
} from "features/articles";
import { useEffect, useState } from "react";
import BaseLayout from "layouts/BaseLayout";
import Loading from "components/Loader";

export default function UpdateArticle() {
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    getArticleBySlug(slug).then(({ data }) => setArticle(data));
  }, []);

  const onSubmit = (form) => {
    updateArticle(slug, form).then(({ data }) => {
      if (!!data?.slug) {
        navigate("/blog/articles");
      }
    });
  };

  const onDelete = () => {
    deleteArticle(slug).then(() => navigate("/blog/articles"));
  };

  return (
    <BaseLayout
      header={{
        pretitle: "Статьи",
        title: "Обновление статьи",
      }}
    >
      {article === null ? (
        <Loading />
      ) : (
        <ArticleForm data={article} onSubmit={onSubmit} onDelete={onDelete} />
      )}
    </BaseLayout>
  );
}
