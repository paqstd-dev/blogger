import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Loading from "./components/Loader";

// redux
import { store } from "./store";
import { Provider } from "react-redux";

// routes
const Home = lazy(() => import("./routes/home"));
const Articles = lazy(() => import("./routes/blog/articles"));
const Article = lazy(() => import("./routes/blog/article"));
const Signin = lazy(() => import("./routes/auth/signin"));
const Signup = lazy(() => import("./routes/auth/signup"));

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