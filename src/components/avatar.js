import { closePopup, openPopup } from "./modal";
import { replaceAvatar } from "./api";
import { renderResult } from "./user";
import { changeButtonValue } from "./utils";

const avatarContainer = document.querySelector('.profile__container-avatar'),
      avatarOverflow = document.querySelector('.profile__edit-avatar-button'),
      popup = document.querySelector('[data-avatar]'),
      buttonHandleAvatar = popup.querySelector('.popup__button'),
      input = popup.querySelector('.popup__input-text'),
      form = popup.querySelector('.popup__form-avatar');


function editAvatar() {
  avatarOverflow.style.visibility = 'visible'
  avatarContainer.removeEventListener('mouseover', outAvatar)
}

function outAvatar() {
  avatarOverflow.style.visibility = 'hidden'
  avatarContainer.removeEventListener('mouseout', editAvatar)
}

function openPopupAvatar() {
  openPopup(popup)
}

function handleAvatar() {
  event.preventDefault()
  const popup = document.querySelector('.popup_opened');
  changeButtonValue(popup, 'Сохранение...')
  replaceAvatar(input.value)
    .then(res => {
      renderResult(res)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      closePopup(popup);
      form.reset();
      changeButtonValue(popup, 'Сохранить')
    })
}

export {avatarContainer, buttonHandleAvatar, editAvatar, outAvatar, openPopupAvatar, handleAvatar}



