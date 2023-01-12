import axios from "lib/axios";

export function signinAccount(form) {
  return axios.post("/users/authorize", form);
}
