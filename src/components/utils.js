import { closePopup } from "./modal";

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup)
  }
}

export {closeByEscape}
