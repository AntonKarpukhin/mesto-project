//Template Cards.
import { closePopup, openPopup } from "./modal";
import { initialCards } from "../js/constants";

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

export {renderCard}
