import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    // collects data from all input fields and returns it as object
    // this data should then be passed to submission handler as argument
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value();
    });
    return formValues;
  }

  setEventListeners() {
    // adds submit event handler to form and calls setEventListners() of parent
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
}
