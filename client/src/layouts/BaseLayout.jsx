import Header from "../components/Header";

export default function BaseLayout({ children }) {
  return (
    <>
      <Header
        links={[
          {
            label: "Главная",
            link: "/",
          },
          {
            label: "Статьи",
            link: "/blog/articles",
          },
        ]}
      />

      {children}
    </>
  );
}
