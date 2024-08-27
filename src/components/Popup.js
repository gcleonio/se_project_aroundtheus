export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", (event) => {
      this._handleEscClose(event);
    });
    this.setEventListeners();
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", (event) => {
      this._handleEscClose(event);
    });
  }

  _handleEscClose(event) {
    // listens for esc button
    if (event.type === "keyup" && event.key === "Escape") {
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
}
