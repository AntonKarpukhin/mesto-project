import { closePopup } from "./modal";

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup)
  }
}

function changeButtonValue(popup, name) {
  popup.querySelector('.popup__button').textContent = name

}

export {closeByEscape, changeButtonValue}
