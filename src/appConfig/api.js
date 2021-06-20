import APIConstants from "./APIConstants";
import axios from "axios";

/*
 * HTTP Request for non file upload APIs
 * General api to access data from web
 */
const url = APIConstants.BASE_URL;

export default function api(
  path,
  params,
  method
) {
  let options = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  };

  // if (!!accessToken) {
  //   options = {
  //     Accept: "application/json, text/plain, */*",
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   };
  // }



  const fullUrl = url + path;
  const apiConfig = {
    method: method,
    url: fullUrl,
    data: params,
    headers: options
  };
  return axios(apiConfig)
}
