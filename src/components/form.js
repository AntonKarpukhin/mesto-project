import { postCard, postUserInfo } from "./api";
import { closePopup, popupAddCard, popupEditProfile } from "./modal";
import { renderCard } from "./card";
import { handleSubmit } from "./utils";

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

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return postUserInfo(inputName.value.trim(), inputJob.value.trim())
      .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        closePopup(popupEditProfile);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleAddCardFormSubmit(evt) {
  function makeRequest() {
    return postCard(inputPlace.value.trim(), inputLink.value.trim())
      .then((userData) => {
        renderCard(userData.name, userData.link, userData.likes, userData.owner._id, userData._id, userData.owner._id);
        closePopup(popupAddCard);
      });
  }
  handleSubmit(makeRequest, evt);
}

export {fillInFormInputs, formEditProfile, formAddCard, handleProfileFormSubmit, handleAddCardFormSubmit}
