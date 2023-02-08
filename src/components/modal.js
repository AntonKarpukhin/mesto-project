const buttonsClosePopup = document.querySelectorAll('.popup'),
      popupEditProfile = document.querySelector('[data-editing]'),
      popupAddCard = document.querySelector('[data-add]'),
      editModalBtn = document.querySelector('.profile__edit-button'),
      addCardModalBtn = document.querySelector('.profile__add-button');

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

export {openPopup, closePopup, buttonsClosePopup, popupEditProfile, popupAddCard, editModalBtn, addCardModalBtn};
