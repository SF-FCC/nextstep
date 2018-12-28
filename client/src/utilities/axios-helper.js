const { getItem } = require("./cookie-helper");

const getToken = name => {
  return getItem(name);
};

export const reqConfig = { headers: { Authorization: `Bearer ${getToken("token")}` } };
