import { makeApiCall } from "./api";

export const registerUsers = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "registerBengaliCopilot",
    payload: payload,
    isLocal: true,
    isMock: true,
  });
};

export const loginUser = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "loginBengaliCopilot",
    payload: payload,
    isLocal: true,
    isMock: true,
  });
};

export const getLanguages = (payload) => {
  return makeApiCall({
    method: "GET",
    url: "loginUser",
    payload: payload,
    isLocal: false,
    isMock: false,
  });
};

export const uploadFile = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "uploadFile",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
};

export const getNER = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "get_ner",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
};

export const getAnswer = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "get_answer",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
};

export const generateQuestion = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "get_question",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
}

export const getParagraphDetails = (payload) => {
  return makeApiCall({
    method: "POST",
    url: "get_paragraph_details",
    payload: payload,
    isLocal: true,
    isMock: false,
  });
};