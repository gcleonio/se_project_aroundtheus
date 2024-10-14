export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeIcon = handleLikeIcon;
  }

  // _setEventListeners method that sets the necessary event listeners
  _setEventListeners() {
    // card like button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // card delete button
    // this._cardElement
    //   .querySelector(".card__delete-button")
    //   .addEventListener("click", () => {
    //     this._handleDeleteCard();
    //   });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id, this);
    });

    // card image
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  // private method for like button handler
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  // _handleDeleteCard() {
  //   this._cardElement.remove();
  //   this._cardElement = null;
  // }

  setButtonState() {
    if (this._isLiked) {
      this._handleLikeIcon();
    }
  }

  // one public method that returns fully functional card element populated with appropriate data
  getView() {
    //gets the card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._trashButton = this._cardElement.querySelector(".card__delete-button");

    // set event listeners
    this._setEventListeners();

    this.setButtonState();

    // return the card
    return this._cardElement;
  }
}
