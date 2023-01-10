import { initialCards } from './constants.js';

window.addEventListener('DOMContentLoaded', function() {

  // Modals.
  const modalOpenBtn = document.querySelectorAll('[data-openBtn]'),
        modalCloseBtn = document.querySelectorAll('[data-closeBtn]'),
        popupEditProfile = document.querySelector('[data-editing]'),
        popupAddCard = document.querySelector('[data-add]'),
        scroll = calcScroll();

  function openModal (popup) {
    if (popup && popup.classList.contains('profile__edit-button')) {
      popupEditProfile.classList.add('popup_opened');
      closeModalOverflow(popupEditProfile);
      setNameForm();
    } else if (popup && popup.classList.contains('profile__add-button')){
      popupAddCard.classList.add('popup_opened');
      closeModalOverflow(popupAddCard);
    }
  }

  function closeModal (popup) {
    if (popup && (popup.classList.contains('popup__close-icon_edit') || popup.classList.contains('popup__form-editing'))) {
      popupEditProfile.classList.remove('popup_opened');
      closeModalOverflow(popupEditProfile);
    } else if (popup && (popup.classList.contains('popup__close-icon_add') || popup.classList.contains('popup__form-add'))){
      popupAddCard.classList.remove('popup_opened');
      closeModalOverflow(popupAddCard);
    }
  }

  //Additional closure modal
  function closeModalOverflow(modal) {
    if (modal.classList.contains('popup_opened')) {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scroll}px`;
      const btn = modal.lastElementChild.lastElementChild;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(btn);
        }
      });
    } else {
      document.body.style.overflow = '';
      document.body.style.marginRight = '0';
    }
  }

  modalOpenBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      openModal(evt.target)
    });
  })

  modalCloseBtn.forEach(btn => {
    btn.addEventListener('click', (evt) => {
      closeModal(evt.target)
    });
  })

  //Scroll delete
  function calcScroll() {
    const div = document.querySelector('.helpers__scroll_delete');
    return div.offsetWidth - div.clientWidth;
  }

  //Template Cards.
  const containerTemplateCard = document.querySelector('#element-template').content,
        sectionElementsCards = document.querySelector('.elements');

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

    // Create big img
    const popupBigImg = document.querySelector('[data-bigImg]');
    const bigImg = document.querySelector('.popup__img');

    function openBigImg() {
      popupBigImg.classList.add('popup_opened');
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = `${scroll}px`;
    }

    popupBigImg.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-icon')) {
        popupBigImg.classList.remove('popup_opened');
        document.body.style.overflow = '';
        document.body.style.marginRight = '0';
      }
    });

    cloneImg.addEventListener('click', (evt) => {
      bigImg.setAttribute('src', evt.target.src);
      bigImg.setAttribute('alt', evt.target.alt);
      openBigImg();
    });

    return cloneCard;
  }

  //Render initial Card
  function renderInitialCards() {
    initialCards.forEach(card => sectionElementsCards.prepend(createCard(card.name, card.link)));
  }
  renderInitialCards()

  //Render new Card
  function renderAddCard(name, link) {
    sectionElementsCards.prepend(createCard(name, link));
  }

  // Forms
  const editFormElement = document.querySelector('form[name="popup-editing"]'),
        addFormCard = document.querySelector('form[name="popup-add"]'),
        inputName = document.querySelector('input[name="name"]'),
        inputJob = document.querySelector('input[name="hobby"]'),
        inputPlace = document.querySelector('input[name="place"]'),
        inputLink = document.querySelector('input[name="link"]'),
        profileName = document.querySelector('.profile__name'),
        profileJob = document.querySelector('.profile__text');

  function setNameForm() {
    inputName.value = profileName.innerText;
    inputJob.value = profileJob.innerText;
  }

  function handleEditFormSubmit() {
    profileName.textContent = inputName.value.trim();
    profileJob.textContent = inputJob.value.trim();
  }

  editFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    handleEditFormSubmit();
    closeModal(evt.target);
  });

  function handleCardFormSubmit() {
    const placeInputValue = inputPlace.value.trim();
    const linkInputValue = inputLink.value.trim();
    return {placeInputValue, linkInputValue};
  }

  addFormCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const { placeInputValue, linkInputValue } = handleCardFormSubmit()
    renderAddCard(placeInputValue, linkInputValue);
    closeModal(evt.target);
    addFormCard.reset();
  });

});


