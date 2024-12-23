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

//For testing purposes, can assign api to window.api in JavaScript setup to make it accessible globally
window.api = api;

// Create New Card Element
function createCard(item) {
  const card = new Card(
    item,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  );
  return card.getView();
}

// Add elements to the DOM
const cardListEl = new Section(
  {
    renderer: (data) => {
      cardListEl.addItem(createCard(data));
    },
  },

  ".cards__list"
);

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
  avatarSelector: ".profile__image",
});

// Ensure that user's profile avatar, name, and description persist correctly on page refresh
// api.getUserInfo() call should be used to set the user info in UI elements (e.g., text fields or image src attributes)
document.addEventListener("DOMContentLoaded", () => {
  api
    .getUserInfo()
    .then((userData) => {
      console.log("User Data:", userData);
      // Update UI with user data
      userInfo.setProfileAvatar(userData.avatar);
      userInfo.setUserInfo(userData);
    })
    .catch((error) => {
      console.error("Error fetching user data", error);
    });
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
      // Disable submit button only in a 'then' block after a successful response to be able to click it again if there is a server error.
      popupInstance.resetValidation();
    })
    // we need to catch possible errors
    .catch(console.error)
    // in 'finally' return initial button text back in any case
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

// Like and unlike
function handleLikeIcon(card) {
  if (!card.isLiked) {
    // if card is not liked, like it
    api
      .likeCard(card._id)
      .then(() => {
        console.log(card);
        card.setIsLiked(true);
      })
      .catch(console.error);
  } else {
    api
      .unlikeCard(card._id)
      .then(() => {
        card.setIsLiked(false);
      })
      .catch(console.error);
  }
}

// Delete modal and methods
const deleteCardPopup = new PopupWithConfirm({
  popupSelector: "#delete-confirm-modal",
});
deleteCardPopup.setEventListeners();

function handleDeleteCard(cardID, card) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(cardID)
      .then(() => {
        card.handleDeleteCard();
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
  handleAvatarFormSubmit,
  avatarFormValidator
);
editAvatarPopup.setEventListeners();

editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
  // not needed here because resetting validation in handleSubmit
  // avatarFormValidator.resetValidation();
});

function handleAvatarFormSubmit(data) {
  // console.log this inputValue this is the one going to the api request
  console.log(data);
  function makeRequest() {
    // data has 'link' property. need to use link property on api call
    return api.updateAvatar(data.link).then((res) => {
      console.log(res);
      // using avatar property of res object to set profile avatar
      userInfo.setProfileAvatar(res.avatar);
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
  handleAddCardFormSubmit,
  addFormValidator
);
addCardPopup.setEventListeners();

function handleAddCardFormSubmit(data) {
  console.log(data);

  function makeRequest() {
    console.log("Adding card with:", { name: data.title, link: data.url });
    if (!data.title || !data.url) {
      console.error("Name or link is missing");
      return;
    }
    return api
      .addCard({ name: data.title, link: data.url })
      .then((cardData) => {
        cardListEl.addItem(createCard(cardData));
        addCardFormElement.reset();
      });
  }
  handleSubmit(makeRequest, addCardPopup);
}

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// EDIT PROFILE MODAL AND METHODS
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  editFormValidator
);
editProfilePopup.setEventListeners();

function handleProfileEditSubmit(formData) {
  function makeRequest() {
    // using the response from the API (res) to set the user info
    return api.updateProfileInfo(formData).then((res) => {
      // res is a ready object with name, about and avatar properties, use it while setting the user info:
      console.log(res);
      console.log(formData);
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
      });
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
