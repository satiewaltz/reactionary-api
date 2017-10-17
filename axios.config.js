const axios = require("axios");

axios.interceptors.request.use(
  config => {
    const token = process.env.TOKEN;
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.headers["x-ratelimit-remaining"]) {
      console.log(
        `REMAINING RESPONSES: ${response.headers[
          "x-ratelimit-remaining"
        ]}`
      );
    }
    console.log("// Response Success! /////////////////");
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

module.exports = axios;
