//Template Cards.
import { closePopup, openPopup } from "./modal";
import { addLikeCard, deleteCard, deleteLikeCard } from "./api";

const containerTemplateCard = document.querySelector('#element-template').content,
      sectionElementsCards = document.querySelector('.elements'),
      popupBigImg = document.querySelector('[data-bigImg]'),
      bigImg = popupBigImg.querySelector('.popup__img'),
      popupDescription = popupBigImg.querySelector('.popup__description'),
      popupDelete = document.querySelector('[data-deleteCard]'),
      buttonDeleteElement = document.querySelector('[data-deleteElement]');

//Create Card
function createCard (name, link, likes, userId, cardId, myId) {
  const cloneCard = containerTemplateCard.querySelector('.element').cloneNode(true),
        cloneImg = cloneCard.querySelector('.element__img'),
        likeButton = cloneCard.querySelector('.element__icon'),
        likeCounter = cloneCard.querySelector('.element__likes'),
        basketButton = cloneCard.querySelector('.element__basket');

  cloneImg.alt = name;
  cloneImg.src = link;
  cloneCard.querySelector('.element__title').textContent = name;

  //Like Card
  function likeCard(evt) {
    if (!evt.target.classList.contains('element__icon_active')) {
      addLikeCard(cardId)
        .then(res => {
          likeButton.classList.add('element__icon_active')
          likeCounter.textContent = res.likes.length
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      deleteLikeCard(cardId)
        .then(res => {
          likeButton.classList.remove('element__icon_active')
          likeCounter.textContent = res.likes.length
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  likeButton.addEventListener('click', likeCard);

  function checkMyLike(likes) {
    return likes.some(item => {
      return item._id === myId
    })
  }

  if (likes) {
    likeCounter.textContent = likes.length;
    checkMyLike(likes) ? likeButton.classList.add('element__icon_active') : ''
  } else {
    likeCounter.textContent = 0;
  }

  //Delete Card
  if (myId !== userId) {
    basketButton.style.visibility = 'hidden'
  }

  basketButton.addEventListener('click', (evt) => {
    deleteCard(cardId)
      .then(() => {
          evt.target.closest('.element').remove();
      })
      .catch(err => {
        console.log(err)
      })
  })


  //Big Modal
  cloneImg.addEventListener('click', (evt) => {
    bigImg.setAttribute('src', evt.target.src);
    bigImg.setAttribute('alt', evt.target.alt);
    popupDescription.textContent = evt.target.alt;
    openPopup(popupBigImg)
  });

  return cloneCard;
}

//Render new Card
function renderCard(name, link, likes, owner, id, bool) {
  sectionElementsCards.prepend(createCard(name, link, likes, owner, id, bool));
}

export {renderCard, sectionElementsCards, createCard}
