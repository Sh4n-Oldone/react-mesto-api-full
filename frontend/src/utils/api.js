import { getToken } from './token';

class Api {
  constructor(options) {
    this._userUrl = options.userUrl;
    this._cardsUrl = options.cardsUrl;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getCardsData() {
    return fetch(this._cardsUrl, {
      headers: this._headers
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setUserData(data) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setCardsData(data) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeCard(_id) {
    return fetch(this._cardsUrl + '/' + _id, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  putLike(_id) {
    return fetch(this._cardsUrl + '/' + _id + '/likes', {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeLike(_id) {
    return fetch(this._cardsUrl + '/' + _id + '/likes', {
      method: 'DELETE',
      headers: this._headers
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  changeLikeCardStatus(_id, isLiked) {
    if (isLiked) {
      return this.removeLike(_id)
    } else {
      return this.putLike(_id)
    }
  }

  setNewAvatar(data) {
    return fetch(this._userUrl + '/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}
const token = getToken();
const myApi = new Api({
  userUrl: 'https://api.alexpavlov.students.nomoreparties.space/users/me',
  cardsUrl: 'https://api.alexpavlov.students.nomoreparties.space/cards',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`
  }
});

export default myApi;