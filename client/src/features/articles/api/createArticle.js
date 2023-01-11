import axios from "lib/axios";

export function createArticle(form) {
  return axios.post("/articles/create", form);
}
