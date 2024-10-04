export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    // _handleEscClose is properly bound in the constructor, ensuring the same function reference is used anytime the event listener is added or removed
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    // listens for esc button
    if (event.type === "keydown" && event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners on close button of popup, and closes popup when clicking shaded area outside form
    this._closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupElement.addEventListener("click", (event) => {
      if (
        !this._popupElement
          .querySelector(".modal__container")
          .contains(event.target)
      ) {
        this.close();
      }
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
