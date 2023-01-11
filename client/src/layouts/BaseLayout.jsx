import { IconBook, IconHome } from "@tabler/icons";
import Header from "components/Header";
import PageHeader from "components/PageHeader";

export default function BaseLayout({ children, header }) {
  return (
    <div className="page">
      <Header
        logo="Blogger"
        links={[
          {
            icon: <IconHome />,
            link: "/",
            equal: true,
            label: "Главная",
          },
          {
            icon: <IconBook />,
            link: "/blog/articles",
            label: "Cтатьи",
          },
        ]}
      />

      <div className="page-wrapper">
        <div className="container-xl">
          {header && <PageHeader {...header} />}

          <div className="page-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
