import axios from "lib/axios";

export function deleteArticle(slug) {
  return axios.delete(`/articles/${slug}`);
}
