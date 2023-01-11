import axios from "lib/axios";

export function getArticleBySlug(slug) {
  return axios.get(`/articles/${slug}`);
}
