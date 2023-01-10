import axios from "../../../lib/axios";

export async function signinAction(form) {
  return await axios.post("/authorize", form);
}
