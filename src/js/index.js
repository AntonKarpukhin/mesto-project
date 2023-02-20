import '../pages/index.css';
import {openPopup, closePopup, popups, popupEditProfile, popupAddCard, editModalBtn, addCardModalBtn} from "../components/modal";
import {
  fillInFormInputs, formEditProfile, formAddCard, handleProfileFormSubmit, handleAddCardFormSubmit
} from "../components/form";
import {enableValidation} from "../components/validate";
import {
  avatarContainer,
  openPopupAvatar,
  editAvatar,
  outAvatar,
  handleAvatarSubmit, avatarForm
} from "../components/avatar";
import { getUserInfoAndCard } from "../components/api";
import { renderProfileData } from "../components/user";
import { createCard, sectionElementsCards } from "../components/card";

window.addEventListener('DOMContentLoaded', function() {

  let userId;

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
    handleProfileFormSubmit(evt);
  });

  formAddCard.addEventListener('submit', (evt) => {
    handleAddCardFormSubmit(evt);
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

  getUserInfoAndCard()
    .then(([userData, card]) => {
      userId = userData._id
      renderProfileData(userData)
      card.forEach(card => {
        sectionElementsCards.prepend(createCard(card.name, card.link, card.likes, card.owner._id, card._id, userId))
      })
    })
    .catch(err => {
      console.log(err)
    })

//ChangeAvatar
  avatarContainer.addEventListener('mouseover', editAvatar);
  avatarContainer.addEventListener('mouseout', outAvatar);
  avatarContainer.addEventListener('click', openPopupAvatar);
  avatarForm.addEventListener('submit', (evt) => {
    handleAvatarSubmit(evt)
  });

});






