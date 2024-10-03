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

// UNIVERSAL FORM FUNCTION
// universal form function that accepts a request, popup instance and optional loading text
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  // here we change the button text
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      // We need to close only in 'then'
      popupInstance.close();
    })
    // we need to catch possible errors
    .catch(console.error)
    // in 'finally' return initial button text back in any case
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

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

// AVATAR MODAL AND METHODS
const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarFormSubmit
);
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  avatarUrlInput.value = userInfo.getUserInfo().avatar;
  avatarFormValidator.resetValidation();
});

function handleAvatarFormSubmit(data) {
  function makeRequest() {
    return api.updateAvatar(data.link).then(() => {
      userInfo.setProfileAvatar(data.link);
    });
  }
  handleSubmit(makeRequest, editAvatarPopup);
}

// Creates an instance of PopupWithImage class and calls its parent's setEventListeners()
const cardImageModal = new PopupWithImage("#card-image-modal");
cardImageModal.setEventListeners();

function handleImageClick(cardData) {
  cardImageModal.open(cardData);
}

// ADD CARD MODAL AND METHODS
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function handleAddCardFormSubmit(data) {
  function makeRequest() {
    return api
      .addCard({ name: data.name, link: data.link })
      .then((cardData) => {
        cardListEl.addItem(createCard(cardData));
        addCardFormElement.reset();
      });
  }
  handleSubmit(makeRequest, addCardPopup);
}

// correct and same as above but using destructuring
// function handleAddCardFormSubmit({ title, url }) {
//   const cardData = { name: title, link: url };
//   cardListEl.addItem(createCard(cardData));
//   addCardPopup.close();
//   addCardFormElement.reset();
// }

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// EDIT PROFILE MODAL AND METHODS
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// since setUserInfo is expecting an object with name property and description property, use name & description key/value pairs with formData inside {}
function handleProfileEditSubmit(formData) {
  function makeRequest() {
    return api.updateProfileInfo(formData).then((res) => {
      userInfo.setUserInfo({
        name: res.title,
        description: res.description,
        avatar: res.avatar,
      });
      // editProfilePopup.close();
    });
  }
  handleSubmit(makeRequest, editProfilePopup);
}

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});
