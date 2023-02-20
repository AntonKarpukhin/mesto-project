import { request } from "./utils";

function getUserInfo() {
  return request(`/users/me`)
}

function getCards() {
  return request(`/cards`)
}

function getUserInfoAndCard() {
  return Promise.all([getUserInfo(), getCards()])
}

function postUserInfo(name, about) {
  return request(`/users/me`,
    'PATCH',
    JSON.stringify({
    name: name,
    about: about
  }))
}

function postCard(name, link) {
  return request(`/cards`,
    'POST',
    JSON.stringify({
    name: name,
    link: link
  }))
}

function deleteCard(id) {
  return request(`/cards/${id}`, 'DELETE')
}

function addLikeCard(id) {
  return request(`/cards/likes/${id}`, 'PUT')
}

function deleteLikeCard(id) {
  return request(`/cards/likes/${id}`, 'DELETE')
}

function replaceAvatar(avatar) {
  return request(`/users/me/avatar`,
    'PATCH',
    JSON.stringify({
    avatar: avatar
  }))
}

export {getUserInfoAndCard, postUserInfo, postCard, deleteCard, addLikeCard, deleteLikeCard, replaceAvatar}
