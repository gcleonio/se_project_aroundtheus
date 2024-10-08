import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // collects data from all input fields and returns it as object
    // this data should then be passed to submission handler as argument
    const inputValues = {};
    const inputValueList = this._popupForm.querySelectorAll(".modal__input");
    inputValueList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    // adds submit event handler to form and calls setEventListners() of parent
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // const inputValues = this._getInputValues();
      // this._handleFormSubmit(inputValues);
      // this._popupForm.reset();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
