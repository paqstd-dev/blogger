import axios from "lib/axios";

export async function signupAccount(form) {
  return await axios.post("/users/create", form);
}
