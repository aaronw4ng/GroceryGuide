import _ from "lodash";

const url = "https://hack-for-hope-backend.herokuapp.com";

const checkStatus = async (res) => {
  if (!res.ok) {
    const jsonError = await res.json();
    throw jsonError;
  }
  return res;
};

const parseJSON = (res) => res.json();

export const makeRequest = async (method, path, body = {}) => {
  const getFetchOptions = (method, body) => {
    const base = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    if (_.isEmpty(body)) return base;
    return { ...base, body: JSON.stringify(body) };
  };

  console.log(url + path);
  return fetch(url + path, getFetchOptions(method, body))
    .then(checkStatus)
    .then(parseJSON)
    .then((json) => json)
    .catch((e) => {
      console.log(e);
      throw e;
    });
};
