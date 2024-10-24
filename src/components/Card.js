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
    this.isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeIcon; // changed this._handleLikeIcon to this._handleLikeClick because it was making an error because you already have a method called _handleLikeIcon
  }

  // _setEventListeners method that sets the necessary event listeners
  _setEventListeners() {
    // card like button
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this); // changed to _handleLikeClick, this sends the needed reference to call api.likeCard or api.unlikeCard
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

  // // advised against using toggle functionality to change icon
  // // private method for like button handler, not the same as in constructor
  // _handleLikeIcon() {
  //   //should not be the same name as in constructor because it was being defined twice - once in the constructor and once as a method in the class. one was overwriting the other.
  //   this._likeButton.classList.toggle("card__like-button_active");
  // }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // You shouldn't set the value of isLiked outside of the card, that goes against OOP.
  // You can instead create a method on your card class that does both, sets the _isLiked new value and calls the setButtonState
  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.setButtonState();
  }

  setButtonState() {
    if (this.isLiked) {
      // this._handleLikeIcon(); // use card method, not the one from the constructor
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
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
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    // set event listeners
    this._setEventListeners();

    this.setButtonState();

    // return the card
    return this._cardElement;
  }
}
