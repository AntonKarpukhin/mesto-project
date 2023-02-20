import { closePopup, openPopup } from "./modal";
import { replaceAvatar } from "./api";
import { renderProfileData } from "./user";
import { handleSubmit } from "./utils";

const avatarContainer = document.querySelector('.profile__container-avatar'),
      avatarOverflow = document.querySelector('.profile__edit-avatar-button'),
      avatarPopup = document.querySelector('[data-avatar]'),
      input = avatarPopup.querySelector('.popup__input-text'),
      avatarForm = document.forms["popup-avatar"];


function editAvatar() {
  avatarOverflow.style.visibility = 'visible'
  avatarContainer.removeEventListener('mouseover', outAvatar)
}

function outAvatar() {
  avatarOverflow.style.visibility = 'hidden'
  avatarContainer.removeEventListener('mouseout', editAvatar)
}

function openPopupAvatar() {
  openPopup(avatarPopup)
}

function handleAvatarSubmit(evt) {
  function makeRequest() {
    return replaceAvatar(input.value)
      .then((avatarData) => {
        renderProfileData(avatarData)
        closePopup(avatarPopup);
      });
  }
  handleSubmit(makeRequest, evt);
}

export {avatarContainer, editAvatar, outAvatar, openPopupAvatar, handleAvatarSubmit, avatarForm}



