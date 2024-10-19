/*********************************
 * VALIDATORS CONFIGURATION Settings for forms *
 *********************************/

export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible", //Should this be .modal__error not .modal__error_visible ?
};

// Form fields filled with information from profile page
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

// Input for Edit Profile Form Modal
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Edit Profile Modal
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditForm = profileEditModal.querySelector(".modal__form");

// Add Card Modal
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
// const cardTitleInput = addCardFormElement.querySelector(
//   ".modal__input_type_title"
// );
// const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

// const cardTemplate =
//   document.querySelector("#card-template").content.firstElementChild;

// Edit Avatar Modal
export const avatarForm = document.querySelector("#edit-avatar-modal");
export const avatarUrlInput = document.querySelector("#avatar-input-url");

// Modal Buttons
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
export const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
export const addNewCardButton = document.querySelector(".profile__add-button");
export const editAvatarButton = document.querySelector("#profile-image-pencil");

// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago de Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];
