import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageModalCloseButton = cardImageModal.querySelector(
  "#modal-close-button"
);

// Card Template
const cardListEl = document.querySelector(".cards__list");
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
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closeModalOnEvent);
}

// Close Modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", closeModalOnEvent);
}

// Close modal on overlay click or ESC keydown
function closeModalOnEvent(event) {
  const modals = document.querySelectorAll(".modal");
  if (event.type === "keyup" && event.key === "Escape") {
    modals.forEach((modal) => closeModal(modal));
  }

  if (event.type === "click") {
    modals.forEach((modal) => {
      if (!modal.querySelector(".modal__container").contains(event.target)) {
        closeModal(modal);
      }
    });
  }
}

profileEditModal.addEventListener("click", closeModalOnEvent);
addCardModal.addEventListener("click", closeModalOnEvent);
cardImageModal.addEventListener("click", closeModalOnEvent);

/************************
 * CREATE/ ADD NEW CARD *
 ************************/
// Create New Card Element
function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

// Add New Card to DOM
function renderCard(cardData, cardListEl) {
  const card = createCard(cardData);
  cardListEl.prepend(card);
}

function handleImageClick(cardData) {
  openModal(cardImageModal);
  const imageElement = document.querySelector(".modal__image");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  const cardImageModalPreviewText =
    cardImageModal.querySelector(".modal__title");
  cardImageModalPreviewText.textContent = cardData.name;
}

// Edit Profile Submit Handler
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// Add New Card Submit Handler
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  e.target.reset();
}

// Form Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
cardImageModalCloseButton.addEventListener("click", () =>
  closeModal(cardImageModal)
);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

// Populate Initial Cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
