import axios from "../../../lib/axios";

export async function signupAction(form) {
  return await axios.post("/create", form);
}
