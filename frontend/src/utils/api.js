import { BASE_URL } from './auth';

  class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _handleResponse(res) {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this.getHeaders(),
    })
      .then((res) => this._handleResponse(res))

  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this.getHeaders(),
    })
      .then((res) => this._handleResponse(res))
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data), //{ name: data.title, link: data.link }
    })
      .then((res) => this._handleResponse(res))
  }

  patchNewAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data) // { avatar: data.avatar }
    })
      .then((res) => this._handleResponse(res))
  }

  patchUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ name: data.name, about: data.info }),
    })
      .then((res) => this._handleResponse(res))
  }


  changeLikeStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this.getHeaders()
      })
        .then((res) => this._handleResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })
      .then((res) => this._handleResponse(res))
  }

  getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      ...this._headers,
      'Authorization': `Bearer ${token}`,
    }
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

export default api