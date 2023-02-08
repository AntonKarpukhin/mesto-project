import {closeByEscape} from "./utils";

const popups = document.querySelectorAll('.popup'),
      popupEditProfile = document.querySelector('[data-editing]'),
      popupAddCard = document.querySelector('[data-add]'),
      editModalBtn = document.querySelector('.profile__edit-button'),
      addCardModalBtn = document.querySelector('.profile__add-button');

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape)
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape)
}

export {openPopup, closePopup, popups, popupEditProfile, popupAddCard, editModalBtn, addCardModalBtn};
