const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass, inactiveButtonOpacity) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.classList.remove(inactiveButtonOpacity);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.classList.add(inactiveButtonOpacity);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inactiveButtonOpacity, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass, inactiveButtonOpacity);
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, inactiveButtonClass, inactiveButtonOpacity);
    }, 0)
  })
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass, inactiveButtonOpacity);
    });
  });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inactiveButtonOpacity, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inactiveButtonOpacity, inputErrorClass, errorClass);
  });
};

export {enableValidation}
