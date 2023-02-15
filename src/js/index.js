import '../pages/index.css';
import {openPopup, closePopup, popups, popupEditProfile, popupAddCard, editModalBtn, addCardModalBtn} from "../components/modal";
import {fillInFormInputs, handleEditFormSubmit, handleCardFormSubmit, formEditProfile, formAddCard} from "../components/form";
import {enableValidation} from "../components/validate";
import { setUserProfile } from "../components/user";
import { avatar } from "../components/avatar";

window.addEventListener('DOMContentLoaded', function() {

  // Modals.
  editModalBtn.addEventListener('click', () => {
    fillInFormInputs();
    openPopup(popupEditProfile);
  });

  addCardModalBtn.addEventListener('click', () => {
    openPopup(popupAddCard);
  });

  popups.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup)
      }
    });
  })

  // Forms
  formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleEditFormSubmit();
  });

  formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleCardFormSubmit();
  });

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type_inactive',
    inactiveButtonOpacity: 'opacity',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
  });

});

setUserProfile();

avatar.addEventListener('click', () => {
  avatar.classList.add('profile__avatar_type_edit')
  console.log('yep')
})

