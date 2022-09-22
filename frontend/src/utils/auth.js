export const BASE_URL = 'http://localhost:3000';

export const handleResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(res.status);
};

export const registration = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  }).then((res) => handleResponse(res));
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ email, password }),
  }).then((res) => handleResponse(res));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
};
