import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

// redux
import { store } from "store";
import { Provider } from "react-redux";

// routes
const Home = lazy(() => import("routes/home"));
const Articles = lazy(() => import("routes/blog/articles"));
const Article = lazy(() => import("routes/blog/article"));
const CreateArticle = lazy(() => import("routes/blog/create"));
const UpdateArticle = lazy(() => import("routes/blog/update"));
const Signin = lazy(() => import("routes/auth/signin"));
const Signup = lazy(() => import("routes/auth/signup"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <Suspense fallback={null}>
          <RouterProvider
            router={createBrowserRouter([
              {
                path: "/",
                element: <Home />,
              },
              {
                path: "/blog/articles",
                element: <Articles />,
              },
              {
                path: "/blog/create",
                element: <CreateArticle />,
              },
              {
                path: "/blog/update/:slug",
                element: <UpdateArticle />,
              },
              {
                path: "/blog/articles/:slug",
                element: <Article />,
              },
              {
                path: "/auth/signin",
                element: <Signin />,
              },
              {
                path: "/auth/signup",
                element: <Signup />,
              },
            ])}
          />
        </Suspense>
      </App>
    </Provider>
  </React.StrictMode>
);
