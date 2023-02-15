import { postCard, postUserInfo } from "./api";
import { closePopup, popupAddCard, popupEditProfile } from "./modal";
import { renderCard } from "./card";
import { changeButtonValue } from "./utils";

const formEditProfile = document.forms["popup-editing"],
      formAddCard = document.forms["popup-add"],
      inputName = formEditProfile.elements.name,
      inputJob = formEditProfile.elements.hobby,
      inputPlace = formAddCard.elements.place,
      inputLink = formAddCard.elements.link,
      profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__text');

function fillInFormInputs() {
  inputName.value = profileName.innerText;
  inputJob.value = profileJob.innerText;
}

function handleEditFormSubmit() {
  const popup = document.querySelector('.popup_opened');
  changeButtonValue(popup, 'Сохранение...')
  postUserInfo(inputName.value.trim(), inputJob.value.trim())
    .then(res => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
    }).catch(err => {
      profileName.textContent = err;
      profileJob.textContent = err;
  }).finally(() => {
      closePopup(popupEditProfile);
      changeButtonValue(popup, 'Сохранить')
  })
}

function handleCardFormSubmit() {
  const popup = document.querySelector('.popup_opened');
  changeButtonValue(popup, 'Сохранение...')
  postCard(inputPlace.value.trim(), inputLink.value.trim())
    .then(res => {
      renderCard(res.name, res.link, res.likes, res.owner._id, res._id, false);
    })
    .catch(err => {
      renderCard(err, err);
    })
    .finally(() => {
      closePopup(popupAddCard);
      formAddCard.reset();
      changeButtonValue(popup, 'Создать')
    })
}

export {fillInFormInputs, handleEditFormSubmit, handleCardFormSubmit, formEditProfile, formAddCard}
