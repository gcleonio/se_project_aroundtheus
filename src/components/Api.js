export default class API {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      // checks the server response
      return res.json();
    } else {
      // if server returns an error, reject the promise
      return Promise.reject(`Error ${res.status}`);
    }
  }

  // Card routes
  // GET /cards – Get all cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  // other methods for working with API...
  // POST /cards – Create a card
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
    //   commented out below, because this resolves Promise, and calling function (makeRequest) in index.js not able to access return value
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  // DELETE /cards/:cardId – Delete a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // PUT /cards/:cardId/likes – Like a card
  likeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // DELETE /cards/:cardId/likes – Dislike a card
  unlikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // User routes
  // GET /users/me – Get the current user’s info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // PATCH /users/me – Update your profile information
  updateProfileInfo({ title, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then(this._handleResponse);
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  // PATCH /users/me/avatar – Update avatar
  updateAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: url }),
    }).then(this._handleResponse);
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  // Renders cards after user info is received from server
  renderAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
