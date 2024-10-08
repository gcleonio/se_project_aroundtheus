import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  config,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditModal,
  profileEditForm,
  profileEditButton,
  profileModalCloseButton,
  addCardModalCloseButton,
  addNewCardButton,
  addCardModal,
  addCardFormElement,
  initialCards,
} from "../utils/constants.js";

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Create New Card Element
function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

// Add elements to the DOM
const cardListEl = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardListEl.addItem(createCard(data));
    },
  },

  ".cards__list"
);

cardListEl.renderItems();

// Creates an instance of UserInfo class
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// Creates an instance of PopupWithImage class and calls its parent's setEventListeners()
const cardImageModal = new PopupWithImage("#card-image-modal");
cardImageModal.setEventListeners();

function handleImageClick(cardData) {
  cardImageModal.open(cardData);
}

// Creates an instance of PopupWithForm class for each popup that contains a form, and calls their setEventListeners()
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// since setUserInfo is expecting an object with name property and description property, use name & description key/value pairs with formData inside {}
function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.title,
    description: formData.description,
  });
  editProfilePopup.close();
}

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  const cardData = { name: name, link: link };
  cardListEl.addItem(createCard(cardData));
  addCardPopup.close();
  addCardFormElement.reset();
}

// correct and same as above but using destructuring
// function handleAddCardFormSubmit({ title, url }) {
//   const cardData = { name: title, link: url };
//   cardListEl.addItem(createCard(cardData));
//   addCardPopup.close();
//   addCardFormElement.reset();
// }

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
