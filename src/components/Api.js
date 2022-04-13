class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status))) // Если ответ пришёл, получаем .json, если нет, идём в .catch
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(err => console.log(`Ошибка: ${err}`));
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name,
            about,
          })
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(err => console.log(`Ошибка: ${err}`));
  }
  
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name,
            link
          })
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(err => console.log(`Ошибка: ${err}`));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,        
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(err => console.log(`Ошибка: ${err}`));
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,        
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(err => console.log(`Ошибка: ${err}`));
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,        
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(err => console.log(`Ошибка: ${err}`));
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            avatar  // Этот параметр должен быть ссылкой
          })
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .catch(err => console.log(`Ошибка: ${err}`));
  }

}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "d376e762-1130-4acf-8b0e-4370f7856fb8",
    "Content-Type": "application/json",
  },
});
