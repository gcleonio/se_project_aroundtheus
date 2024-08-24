import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector(".modal__image");
    this._popupTitle = this._popupElement.querySelector(".modal__title");
  }

  open({ name, link }) {
    // set the image's src and alt
    this._popupImage.src = link;
    this._popupImage.alt = name;

    // set the caption's textContent
    this._popupTitle.textContent = name;
    super.open();
  }
}
