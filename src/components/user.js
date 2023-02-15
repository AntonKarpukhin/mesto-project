import { getUserInfo } from "./api";

const profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__text'),
      profileAvatar = document.querySelector('.profile__avatar');

function renderResult(result) {
  profileName.textContent = result.name;
  profileJob.textContent = result.about;
  profileAvatar.src = result.avatar;
}

function renderError(err) {
  profileName.textContent = 'Данные не получены';
  profileJob.textContent = 'Данные не получены';
  profileAvatar.src = err;
}

function setUserProfile() {
  getUserInfo()
    .then(res => {
      renderResult(res)
    }).catch(err => {
      renderError(err)
  })
}

export {setUserProfile, renderResult}



