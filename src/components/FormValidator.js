export default class FormValidator {
  constructor(config, formEl) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._form = formEl;
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    // disable the button at the start
    this._toggleButtonState();
    // then create listener for each field
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        // toggle the button state while user types
        this._toggleButtonState();
      });
    });
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass); // is this line necessary? because .modal__input_type_error is blank in modal.css
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass); // in constants.js should config.errorClass = "modal__error", not "modal__error_visible"? .modal__error_visible in modal.css in blank
  }

  //   hideInputError only 1 argument (inputElement) because it only hides error message
  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputEls.forEach((inputEl) => this._hideInputError(inputEl));
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _hasInvalidInput() {
    return !this._inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      // disable the button only in a then block after a successful response to be able to click it again if there is a server error
      // this._disableSubmitButton();
    });
    this._setEventListeners();
  }
}
