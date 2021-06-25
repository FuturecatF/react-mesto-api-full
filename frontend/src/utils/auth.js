const BASE_URL = "https://auth.nomoreparties.co";
const headers = { "Content-Type": "application/json" };

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function getRegister(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ password, email }),
  }).then(getResponseData);
}

export function getLogin(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      return data;
    })
    .then(getResponseData);
}
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => data)
    .then(getResponseData);
}
