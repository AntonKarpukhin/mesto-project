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

function handleCardFormSubmit() {
  const placeInputValue = inputPlace.value.trim();
  const linkInputValue = inputLink.value.trim();
  return {placeInputValue, linkInputValue};
}

export {fillInFormInputs, handleEditFormSubmit, handleCardFormSubmit, formEditProfile, formAddCard}
