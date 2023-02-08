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
  profileName.textContent = inputName.value.trim();
  profileJob.textContent = inputJob.value.trim();
}

function handleCardFormSubmit() {
  const placeInputValue = inputPlace.value.trim();
  const linkInputValue = inputLink.value.trim();
  return {placeInputValue, linkInputValue};
}

export {fillInFormInputs, handleEditFormSubmit, handleCardFormSubmit, formEditProfile, formAddCard}
