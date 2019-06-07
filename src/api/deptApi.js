import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/depts/";

export function getDepts() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
