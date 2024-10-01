import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import API from "../components/Api.js";
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
  editAvatarButton,
  avatarForm,
  avatarUrlInput,

  // initialCards,
} from "../utils/constants.js";

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardFormElement);
const avatarFormValidator = new FormValidator(config, avatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// API
const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3ae7cc7a-7636-4cd4-8d23-135cd4339ee7",
    "Content-Type": "application/json",
  },
});

// Create New Card Element
function createCard(item) {
  const card = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteCard
  );
  return card.getView();
}

// Add elements to the DOM
const cardListEl = new Section(
  {
    // items: initialCards, //remove since no longer need to show initial hardcoded cards
    renderer: (data) => {
      cardListEl.addItem(createCard(data));
    },
  },

  ".cards__list"
);

// old code to delete before submission
// cardListEl.renderItems();

// Initial Cards
api
  .getInitialCards()
  .then((cards) => {
    // process the result
    console.log("Fetched initial cards:", cards);
    cardListEl.renderItems(cards);
  })
  .catch((error) => {
    // log the error to the console
    console.error("Error fetching cards", error);
  });

// Creates an instance of UserInfo class
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// Delete modal and methods
const deleteCardPopup = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal",
});
deleteCardPopup.setEventListeners();

function handleDeleteCard(cardId, card) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        card.remove();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

// Avatar modal and methods
const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarFormSubmit
);
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarUrlInput.value = userInfo.avatar;
  avatarFormValidator.resetValidation();
});

function handleAvatarFormSubmit(data) {
  editAvatarPopup.renderLoading(true);
  api
    .updateAvatar(data.avatarUrl)
    .then((formData) => {
      userInfo.setProfileAvatar(formData.avatar);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
}

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
