import '../pages/index.css';
import {openPopup, closePopup, buttonsClosePopup, popupEditProfile, popupAddCard, editModalBtn, addCardModalBtn} from "../components/modal";
import {renderCard} from "../components/card";
import {fillInFormInputs, handleEditFormSubmit, handleCardFormSubmit, formEditProfile, formAddCard} from "../components/form";
import {setEventListeners} from "../components/validate";

window.addEventListener('DOMContentLoaded', function() {

  // Modals.
  editModalBtn.addEventListener('click', () => {
    fillInFormInputs();
    openPopup(popupEditProfile);
  });

  addCardModalBtn.addEventListener('click', () => {
    openPopup(popupAddCard);
  });

  buttonsClosePopup.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup)
      }
    });
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      buttonsClosePopup.forEach(popup => {
        closePopup(popup)
      })
    }
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

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  enableValidation();

});


