import axios from "lib/axios";

export function signupAccount(form) {
  return axios.post("/users/create", form);
}
