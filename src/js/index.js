import '../pages/index.css';
import {openPopup, closePopup, popups, popupEditProfile, popupAddCard, editModalBtn, addCardModalBtn} from "../components/modal";
import {renderCard} from "../components/card";
import {fillInFormInputs, handleEditFormSubmit, handleCardFormSubmit, formEditProfile, formAddCard} from "../components/form";
import {enableValidation} from "../components/validate";

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
    closePopup(popupEditProfile);
  });

  formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const { placeInputValue, linkInputValue } = handleCardFormSubmit()
    renderCard(placeInputValue, linkInputValue);
    closePopup(popupAddCard);
    formAddCard.reset();
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


