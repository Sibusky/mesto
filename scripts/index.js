import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import { imagePopup, imageTitle, openImagePopup } from './constants.js'
import { Card } from './Card.js'

const popups = document.querySelectorAll('.popup'); // Все попапы
const profileEditButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const profilePopupEdit = document.querySelector('.popup_place_profile'); // Попап редактирования профиля
const formProfileEdit = document.querySelector('.popup__form_place_profile'); // Форма редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name'); // Ввод данных имени
const bioInput = document.querySelector('.popup__input_type_bio'); // Ввод данных профессии
const profileName = document.querySelector('.profile__name'); // Имя профиля на самой странице
const profileBio = document.querySelector('.profile__bio'); // Профессия профиля на самой странице

const cardsAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточек
const cardsPopup = document.querySelector('.popup_place_cards'); // Попап добавления карточек
const formCarsdAdd = document.querySelector('.popup__form_place_card'); // Форма добавления карточек
const placeName = document.querySelector('.popup__input_type_place-name'); // Ввод данных имени места
const picLink = document.querySelector('.popup__input_type_link'); // Ввод данных ссылки на картинку


const cardsList = document.querySelector('.elements__list'); // Список с карточками

const initialCards = [
    {
      name: 'Краснодарский край',
      link: 'https://images.unsplash.com/photo-1582948818402-e1dbaec39311?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
    },
    {
      name: 'Якутск',
      link: 'https://images.unsplash.com/photo-1597875539337-80821aa9ee52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      name: 'Хибины',
      link: 'https://images.unsplash.com/photo-1634400973502-a528e003ce23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2008&q=80'
    },
    {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1537690381844-9da2b0b69640?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2129&q=80'
    },
    {
      name: 'Уральские горы',
      link: 'https://images.unsplash.com/photo-1632162764331-dfcefeb53f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1548130729-90d4d11826f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    }
]; 



// Конфиг валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const editProfileValidator = new FormValidator(validationConfig, formProfileEdit); // Валидация формы редактирования профиля
const addCardValidator = new FormValidator(validationConfig, formCarsdAdd); // Валидация формы добавления карточки

editProfileValidator.enableValidation(); // Вызываю метод валидации для формы редактирования профиля
addCardValidator.enableValidation(); // Вызываю метод валидации для формы добавления карточки



// Прохожусь по массиву попапов
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        // и закрываю из области overlay
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        // либо нажатием на крестик
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
});

// Функция открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    openPopup(profilePopupEdit);
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
}); 

// Функция отправки формы профиля
const submitProfile = () => {
    profileName.textContent = nameInput.value; // Вставляем имя в профиль
    profileBio.textContent = bioInput.value; // Вставляем профессию в профиль
    closePopup(profilePopupEdit); // Закрываем окно редактирования (popup) профиля
};

// Функция добавления лайка


// Функция удаления карточки


// Функция открытия попапа с изображением
const handleImageClick = (name, link) => { 
    imagePopup.src = link; // Присваиваю картинке ссылку
    imagePopup.alt = name; // Присваиваю картинке значение атрибута 'alt'
    imageTitle.textContent = name; // Присваиваю название картинки

    openPopup(openImagePopup); // Открываю попап
};

// Функция создания карточки
const renderCard = (data) => {
    const card = new Card(data, '.elements__template', handleImageClick);
    const cardElement = card.createCard();

    cardsList.prepend(cardElement);
}

// Функция добавления всех карточек "из коробки" на страницу
const addDefaultCards = () => {
    initialCards.forEach(renderCard);
};

addDefaultCards(); // Вызываю функцию добавления всех карточек "из коробки"

// Функция открытия попапа добавления фотографий
cardsAddButton.addEventListener('click', () => {
    addCardValidator.resetErrors();
    openPopup(cardsPopup);
}); 

// Функция добавления новых карточек
const addCard = () => {
    // Формирую объект
    const data = {
        name: placeName.value,
        link: picLink.value
    }

    renderCard(data); // Создаю новую карточку    
 
    placeName.value = ''; // Обнуляю инпуты
    picLink.value = ''; // Обнуляю инпуты

    addCardValidator.toggleButtonState() // Делаю кнопку сабмита неактивной, если инпуты обнулены
    
    closePopup(cardsPopup); // Закрываю окно редактирования
};

// Добавляю слушателей сабмитов для попапов
formProfileEdit.addEventListener('submit', submitProfile); //Слушатель событий отправки формы данных профиля
formCarsdAdd.addEventListener('submit', addCard) // Слушатель событий отправки формы для добавления карточек
