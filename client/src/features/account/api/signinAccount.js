import axios from "lib/axios";

export async function signinAccount(form) {
  return await axios.post("/users/authorize", form);
}
