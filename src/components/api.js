const cohort = 'plus-cohort-21';
const token = '2958a45e-bafc-4a44-b942-30135d02a6f4';

function getUserInfo() {
  return fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

function getCards() {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

function postUserInfo(name, about) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
    name: name,
    about: about
    }),
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

function postCard(name, link) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    }),
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

function deleteCard(id) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

function addLikeCard(id) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

function deleteLikeCard(id) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}

function replaceAvatar(avatar) {
  return fetch(`https://nomoreparties.co/v1/${cohort}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatar
    }),
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`)
      }
    })
}


export {getUserInfo, getCards, postUserInfo, postCard, deleteCard, addLikeCard, deleteLikeCard}
