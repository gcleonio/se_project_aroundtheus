import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago de Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*************
 * ELEMENTS; *
 *************/

// Edit Profile Modal
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Add Card Modal
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// Full Image Modal
// const cardImageModal = document.querySelector("#card-image-modal");
// const cardImageModalCloseButton = cardImageModal.querySelector(
//   "#modal-close-button"
// );

// Card Template
// const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Modal Butttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");

/****************************
 * VALIDATION CONFIGURATION *
 ****************************/
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/**************
 * FUNCTIONS; *
 **************/

// Open Modal
// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keyup", closeModalOnEvent);
// }

// Close Modal
// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keyup", closeModalOnEvent);
// }

// Close modal on overlay click or ESC keydown
// function closeModalOnEvent(event) {
//   const modals = document.querySelectorAll(".modal");
//   if (event.type === "keyup" && event.key === "Escape") {
//     modals.forEach((modal) => closeModal(modal));
//   }

//   if (event.type === "click") {
//     modals.forEach((modal) => {
//       if (!modal.querySelector(".modal__container").contains(event.target)) {
//         closeModal(modal);
//       }
//     });
//   }
// }

// profileEditModal.addEventListener("click", closeModalOnEvent);
// addCardModal.addEventListener("click", closeModalOnEvent);
// cardImageModal.addEventListener("click", closeModalOnEvent);

/************************
 * CREATE/ ADD NEW CARD *
 ************************/
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

// Add New Card to DOM
// function renderCard(cardData, cardListEl) {
//   const card = createCard(cardData);
//   cardListEl.prepend(card);
// }

// Creates an instance of PopupWithImage class and calls its parent's setEventListeners()
const cardImageModal = new PopupWithImage("#card-image-modal");
cardImageModal.setEventListeners();

// const cardImageModalCloseButton = cardImageModal.querySelector(
//   "#modal-close-button"
// );

function handleImageClick(cardData) {
  // openModal(cardImageModal);
  cardImageModal.open(cardData);
  // const imageElement = document.querySelector(".modal__image");
  // imageElement.src = cardData.link;
  // imageElement.alt = cardData.name;
  // const cardImageModalPreviewText =
  //   cardImageModal.querySelector(".modal__title");
  // cardImageModalPreviewText.textContent = cardData.name;
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

// Edit Profile Submit Handler
// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   closeModal(profileEditModal);
// }

// since setUserInfo is expecting an object with name property and description property, use name & description key/value pairs with formData inside {}
function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.title,
    description: formData.description,
  });
  editProfilePopup.close();
}

// Add New Card Submit Handler
// function handleAddCardFormSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardListEl);
//   closeModal(addCardModal);
//   e.target.reset();
// }

// function handleAddCardFormSubmit(inputValues) {
//   // const cardElement = createCard(inputValues);
//   const cardElement = createCard({
//     name: inputValues.title,
//     link: inputValues.url,
//   });
//   cardListEl.addItem(cardElement);
//   addCardPopup.close();
// }

// function handleAddCardFormSubmit(inputValues) {
//   const cardElement = createCard({
//     name: inputValues.title,
//     link: inputValues.url,
//   });
//   const cardData = { name: name, link: link };
//   renderCard(cardData);
//   addCardPopup.close();
//   e.target.reset();
//   addFormValidator.disableSubmitButton();
// }

function handleAddCardFormSubmit(inputValues) {
  const name = inputValues.title;
  const link = inputValues.url;
  const cardData = { name: title, link: url };
  // renderCard(cardData);
  cardListEl.addItem(createCard(cardData));
  addCardPopup.close();
  addCardFormElement.reset();
  addFormValidator._disableSubmitButton();
}

// Form Listeners

// profileEditButton.addEventListener("click", () => {
//   // profileTitleInput.value = profileTitle.textContent;
//   // profileDescriptionInput.value = profileDescription.textContent;
//   // openModal(profileEditModal);
//   editProfilePopup.open();
// });

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});

// profileModalCloseButton.addEventListener("click", () =>
//   closeModal(profileEditModal)
// );

// already being handled by PopupWithForm
// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
// cardImageModalCloseButton.addEventListener("click", () =>
//   closeModal(cardImageModal)
// );

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
// addNewCardButton.addEventListener("click", () => openModal(addCardModal));
// addCardModalCloseButton.addEventListener("click", () =>
//   closeModal(addCardModal)
// );

// Populate Initial Cards
// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
