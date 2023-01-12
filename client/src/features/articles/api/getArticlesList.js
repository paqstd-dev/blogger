import { PER_PAGE } from "config";
import axios from "lib/axios";

export function getArticlesList(page) {
  return axios.get("/articles", {
    params: {
      page,
      per_page: PER_PAGE,
    },
  });
}
