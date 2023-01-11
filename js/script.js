import { initialCards } from './constants.js';

window.addEventListener('DOMContentLoaded', function() {

  // Modals.
  const buttonsClosePopup = document.querySelectorAll('[data-closeBtn]'),
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

  editModalBtn.addEventListener('click', () => {
    fillInFormInputs();
    openPopup(popupEditProfile);
  });

  addCardModalBtn.addEventListener('click', () => {
    openPopup(popupAddCard);
  });

  buttonsClosePopup.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      closePopup(evt.target.closest('.popup'))
    });
  })

  //Template Cards.
  const containerTemplateCard = document.querySelector('#element-template').content,
        sectionElementsCards = document.querySelector('.elements'),
        popupBigImg = document.querySelector('[data-bigImg]'),
        bigImg = popupBigImg.querySelector('.popup__img'),
        popupDescription = popupBigImg.querySelector('.popup__description');

  //Create Card
  function createCard (name, link) {
    const cloneCard = containerTemplateCard.querySelector('.element').cloneNode(true),
          cloneImg = cloneCard.querySelector('.element__img');

    cloneImg.alt = name;
    cloneImg.src = link;
    cloneCard.querySelector('.element__title').textContent = name;

    //Like Card
    cloneCard.querySelector('.element__icon').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__icon_active');
    });

    //Delete Card
    cloneCard.querySelector('.element__basket').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });

    cloneImg.addEventListener('click', (evt) => {
      bigImg.setAttribute('src', evt.target.src);
      bigImg.setAttribute('alt', evt.target.alt);
      popupDescription.textContent = evt.target.alt;
      openPopup(popupBigImg)
    });

    return cloneCard;
  }

  popupBigImg.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
      closePopup(popupBigImg);
    }
  });

  //Render initial Card
  function renderInitialCards() {
    initialCards.forEach(card => sectionElementsCards.prepend(createCard(card.name, card.link)));
  }
  renderInitialCards()

  //Render new Card
  function renderCard(name, link) {
    sectionElementsCards.prepend(createCard(name, link));
  }

  // Forms
  const formEditProfile = document.querySelector('form[name="popup-editing"]'),
        formAddCard = document.querySelector('form[name="popup-add"]'),
        inputName = document.querySelector('input[name="name"]'),
        inputJob = document.querySelector('input[name="hobby"]'),
        inputPlace = document.querySelector('input[name="place"]'),
        inputLink = document.querySelector('input[name="link"]'),
        profileName = document.querySelector('.profile__name'),
        profileJob = document.querySelector('.profile__text');

  function fillInFormInputs() {
    inputName.value = profileName.innerText;
    inputJob.value = profileJob.innerText;
  }

  function handleEditFormSubmit() {
    profileName.textContent = inputName.value.trim();
    profileJob.textContent = inputJob.value.trim();
  }

  formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleEditFormSubmit();
    closePopup(popupEditProfile);
  });

  function handleCardFormSubmit() {
    const placeInputValue = inputPlace.value.trim();
    const linkInputValue = inputLink.value.trim();
    return {placeInputValue, linkInputValue};
  }

  formAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const { placeInputValue, linkInputValue } = handleCardFormSubmit()
    renderCard(placeInputValue, linkInputValue);
    closePopup(popupAddCard);
    formAddCard.reset();
  });

});


