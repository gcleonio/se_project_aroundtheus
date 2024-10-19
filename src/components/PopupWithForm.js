import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._submitButtonText = this._submitButton.textContent;
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

  // add 2 params: isLoading and loadingText with a default text
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      // here we return back the initial text
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
