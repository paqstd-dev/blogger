import axios from "lib/axios";

export function updateArticle(slug, form) {
  return axios.put(`/articles/${slug}`, form);
}
