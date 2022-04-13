
export const imagePopup = document.querySelector('.popup__image'); // Открытая фотография

export const profileEditButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
export const formProfileEdit = document.querySelector('.popup__form_place_profile'); // Форма редактирования профиля
export const nameInput = document.querySelector('.popup__input_type_name'); // Ввод данных имени
export const bioInput = document.querySelector('.popup__input_type_bio'); // Ввод данных профессии

export const cardsAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточек
export const formCarsdAdd = document.querySelector('.popup__form_place_card'); // Форма добавления карточек

export const avatarImage = document.querySelector('.profile__avatar-hover'); // Div над аватаром, используется при наведении мыши
export const formEditAvatar = document.querySelector('.popup__form_place_edit-avatar'); // Форма редактирования аватара

// Конфиг валидации
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export const initialCards = [
    {
      name: '',
      link: ''
    }

]; 