import { useNavigate } from "react-router-dom";
import { ArticleForm, createArticle } from "features/articles";
import BaseLayout from "layouts/BaseLayout";

export default function CreateArticle() {
  const navigate = useNavigate();

  const onSubmit = (form) => {
    createArticle(form).then((response) => {
      if (!!response?.slug) {
        navigate("/blog/articles");
      }
    });
  };

  return (
    <BaseLayout
      header={{
        pretitle: "Статьи",
        title: "Создание статьи",
      }}
    >
      <ArticleForm onSubmit={onSubmit} />
    </BaseLayout>
  );
}
