//Template Cards.
import { closePopup, openPopup } from "./modal";
import { addLikeCard, deleteCard, deleteLikeCard, getCards } from "./api";

const containerTemplateCard = document.querySelector('#element-template').content,
      sectionElementsCards = document.querySelector('.elements'),
      popupBigImg = document.querySelector('[data-bigImg]'),
      bigImg = popupBigImg.querySelector('.popup__img'),
      popupDescription = popupBigImg.querySelector('.popup__description');

//Create Card
function createCard (name, link, likes, idDeleteButton, cardId, heartLike) {
  const cloneCard = containerTemplateCard.querySelector('.element').cloneNode(true),
        cloneImg = cloneCard.querySelector('.element__img'),
        id = 'cd0ea33eca6f1bac3e2f63a4';

  cloneImg.alt = name;
  cloneImg.src = link;
  cloneCard.querySelector('.element__title').textContent = name;

  //Like Card
  function likeCard(evt) {
    if (!evt.target.classList.contains('element__icon_active')) {
      addLikeCard(cardId)
        .then(res => {
          evt.target.closest('.element').replaceWith(createCard(res.name, res.link, res.likes, res.owner._id, res._id, true))
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      deleteLikeCard(cardId)
        .then(res => {
          evt.target.closest('.element').replaceWith(createCard(res.name, res.link, res.likes, res.owner._id, res._id, false))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  cloneCard.querySelector('.element__icon').addEventListener('click', likeCard);

  function checkMyLike(likes) {
    return likes.some(item => {
      return item._id === id
    })
  }

  if (likes) {
    cloneCard.querySelector('.element__likes').textContent = likes.length;
    checkMyLike(likes) ? cloneCard.querySelector('.element__icon').classList.add('element__icon_active') : ''
  } else {
    cloneCard.querySelector('.element__likes').textContent = 0;
  }

  if (heartLike) {
    cloneCard.querySelector('.element__icon').classList.add('element__icon_active')
  } else if (!checkMyLike(likes)) {
    cloneCard.querySelector('.element__icon').classList.remove('element__icon_active')
  }

  //Delete Card
  if (idDeleteButton !== id) {
    cloneCard.querySelector('.element__basket').style.visibility = 'hidden'
  }

  function removeOldElements() {
    sectionElementsCards.querySelectorAll('.element').forEach(item => item.remove())
  }

  function removeCard() {
    const popup = document.querySelector('[data-deleteCard]');
    openPopup(popup);

    function handleDeleteCard() {
      deleteCard(cardId)
        .then(() => {
          removeOldElements()
          renderInitialCards()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          closePopup(popup)
        })
    }

    popup.querySelector('.popup__button').addEventListener('click', (evt) => {
      evt.preventDefault();
      handleDeleteCard()
    }, {once: true});
  }

  cloneCard.querySelector('.element__basket').addEventListener('click', (evt) => {
    evt.preventDefault();
    removeCard();
  }, {once: true});

  //Big Modal
  cloneImg.addEventListener('click', (evt) => {
    bigImg.setAttribute('src', evt.target.src);
    bigImg.setAttribute('alt', evt.target.alt);
    popupDescription.textContent = evt.target.alt;
    openPopup(popupBigImg)
  });

  return cloneCard;
}

//Render initial Card
function renderInitialCards() {
  getCards()
    .then(cards => {
      cards.forEach(card => {
        sectionElementsCards.prepend(createCard(card.name, card.link, card.likes, card.owner._id, card._id))
      })
    })
    .catch(err => {
      sectionElementsCards.prepend(createCard(err, err))
    })
}
renderInitialCards()

//Render new Card
function renderCard(name, link, likes, owner, id, bool) {
  sectionElementsCards.prepend(createCard(name, link, likes, owner, id, bool));
}

export {renderCard}
