/*********************************
 * VALIDATORS CONFIGURATION Settings for forms *
 *********************************/

export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
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
