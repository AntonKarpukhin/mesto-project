const profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__text'),
      profileAvatar = document.querySelector('.profile__avatar');

function renderProfileData(result) {
  profileName.textContent = result.name;
  profileJob.textContent = result.about;
  profileAvatar.src = result.avatar;
}

export {renderProfileData,}



