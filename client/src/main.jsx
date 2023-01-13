import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
const Page404 = lazy(() => import("routes/404"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <Suspense fallback={null}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/articles" element={<Articles />} />
              <Route path="/blog/articles/:slug" element={<Article />} />
              <Route path="/blog/create" element={<CreateArticle />} />
              <Route path="/blog/update/:slug" element={<UpdateArticle />} />
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/signup" element={<Signup />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </App>
    </Provider>
  </React.StrictMode>
);
