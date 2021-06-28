class Api {
  constructor(apiOptions) {
    this._baseUrl = apiOptions.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }
    }).then(this._getResponseData);
  }

  postNewCard(data, jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
         Authorization: `Bearer ${jwt}`
      }, 
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  getUserProfile(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._getResponseData);
  }

  setUserProfile(data, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
         Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(data),
    }).then(this._getResponseData);
  }

  deleteCard(cardId, jwt) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
         Authorization: `Bearer ${jwt}`
      },
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked, jwt) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
           Authorization: `Bearer ${jwt}`
        },
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
           Authorization: `Bearer ${jwt}`
        },
      }).then(this._getResponseData);
    }
  }

  setUserAvatar(avatar, jwt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
         Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(avatar),
    }).then(this._getResponseData);
  }
}

export const api = new Api({
  baseUrl: "https://api.futurecat.nomoredomains.club",
  /* headers: {
    "Content-type": "application/json",
  }, */
});
