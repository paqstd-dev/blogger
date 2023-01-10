import Header from "../components/Header";
import { IconBook, IconHome } from "@tabler/icons";

export default function BaseLayout({ children }) {
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
        <div className="container-xl pt-3">{children}</div>
      </div>
    </div>
  );
}
