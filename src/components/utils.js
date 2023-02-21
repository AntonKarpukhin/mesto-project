import { closePopup } from "./modal";

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup)
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

function request(url, method, endpoint) {
  const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-21',
    headers: {
      authorization: '2958a45e-bafc-4a44-b942-30135d02a6f4',
      'Content-Type': 'application/json'
    },
    method: method,
    body: endpoint
  }
  return fetch(`${config.baseUrl}${url}`, config).then(checkResponse)
}

function changeButtonText(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  changeButtonText(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      changeButtonText(false, submitButton, initialText);
    });
}

export {closeByEscape, checkResponse, request, handleSubmit}
