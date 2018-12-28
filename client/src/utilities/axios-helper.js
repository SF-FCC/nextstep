const { getItem } = require("./cookie-helper");

const getToken = name => {
  return getItem(name);
};

export function reqConfig(name) {
  const token = getToken(name);
  const headersObj = { headers: { Authorization: `Bearer ${token}` } };
  return headersObj;
}
