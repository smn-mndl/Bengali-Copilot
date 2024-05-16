import axios from "axios";

const API_URL = (isMock, isLocal) => {
  return isLocal
    ? !isMock
      ? "http://localhost:8000"
      : "http://localhost:8080"
    : "https://example-vuu1.onrender.com";
};

const createStaticHeader = () => {
  return {
    mode: "cors",
    cache: "no-cache",
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export const makeApiCall = async ({ method, url, payload, isLocal, isMock }) => {
  const staticHeader = createStaticHeader();
  const apiurl = `${API_URL(isMock, isLocal)}/${url}`;
  const apiHeader = {
    ...staticHeader,
    url: apiurl,
    method: method,
    data: payload,
  };
  const response = axios(apiHeader);
  return response;
};

export const makeApiCallForResetPassword = async ({ method, url, payload, isLocal, isMock }) => {
  const staticHeader = createStaticHeader();
  const apiurl = `${API_URL(isMock, isLocal)}/${url}`;
  const apiHeader = {
    ...staticHeader,
    url: apiurl,
    method: method,
    params: payload,
  };
  const response = axios(apiHeader);
  return response;
};

// export default makeApiCall;
