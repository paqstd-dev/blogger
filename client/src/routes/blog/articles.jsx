import { useState, useEffect } from "react";
import { ArticleCard, getArticlesList } from "features/articles";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PER_PAGE } from "config";
import debounce from "lodash.debounce";
import BaseLayout from "layouts/BaseLayout";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "components/Loader";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { authorized } = useSelector(({ account }) => account);

  const loadArticles = () => {
    getArticlesList(page).then((response) => {
      setArticles((state) => [...state, ...response]);
      setPage((state) => state + 1);
      setHasMore(response.length === PER_PAGE);
    });
  };

  // load inital
  useEffect(() => {
    loadArticles();
  }, []);

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
      <InfiniteScroll
        className="row row-deck"
        pageStart={0}
        loadMore={debounce(loadArticles, 500)}
        hasMore={hasMore}
        loader={<Loading />}
      >
        {articles.map((article, index) => (
          <div className="col-lg-4 mb-3" key={index}>
            <ArticleCard {...article} />
          </div>
        ))}
      </InfiniteScroll>
    </BaseLayout>
  );
}
