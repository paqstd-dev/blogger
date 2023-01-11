import axios from "lib/axios";

export function verifyAccount() {
  return axios.post("/users/verify");
}
