import axios from "../../../lib/axios";

export function getArticlesList() {
  return axios.get("/articles");
}
