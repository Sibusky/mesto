import './index.css'; // импорт главного файла стилей 

import { profileEditButton, 
    formProfileEdit,
    nameInput,
    bioInput,
    cardsAddButton,
    formCarsdAdd,
    cardsList,
    initialCards,
    validationConfig 
} from '../utils/constants.js'
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'


const editProfileValidator = new FormValidator(validationConfig, formProfileEdit); // Валидация формы редактирования профиля
const addCardValidator = new FormValidator(validationConfig, formCarsdAdd); // Валидация формы добавления карточки

editProfileValidator.enableValidation(); // Вызываю метод валидации для формы редактирования профиля
addCardValidator.enableValidation(); // Вызываю метод валидации для формы добавления карточки

// Функция открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    editProfileValidator.resetErrors(); // Сбрасываю сообщения об ошибках в инпутах, если они были ранее
    
    const data = userInfo.getUserInfo();
    
    nameInput.value = data.name; // Вставляю содержимое в форму
    bioInput.value = data.bio; // Вставляю содержимое в форму
    editProfilePopup.open(); // Открываю попап
}); 

// Функция отправки формы профиля
const submitProfile = (data) => {
    // Задаю данные для инпутов
    const profile = {
        name: data['profilename-input'],
        bio: data['bio-input']
    };
    userInfo.setUserInfo(profile.name, profile.bio); // Вставляю данные инпутов
    editProfilePopup.close(); // Закрываю окно
};

// Функция создания карточки (без добавления на страницу)
const createCard = (data) => {
    const card = new Card(data, '.elements__template', () => {
        imagePopup.open(data.name, data.link)
    }); // Создаю класс карточки
    const cardElement = card.createCard(); // Создаю карточку
    return cardElement; // Возвращаю элемент карточки
};

// Функция загрузки карточки на страницу
const renderCard = (data) => {
    const cardElement = createCard(data);
    section.addItem(cardElement); // Вставляю карточку в начало списка
};

// Функция открытия попапа добавления фотографий
cardsAddButton.addEventListener('click', () => {
    addCardValidator.resetErrors();
    addCardPopup.open();
}); 

// Функция добавления новых карточек
const addCard = (data) => {
    // Формирую карточку с правильными данными
    const card = createCard({
        name: data['placename-input'],
        link: data['picturelink-input']
    }); 

    section.addItem(card); // Добавляю карточку

    addCardValidator.toggleButtonState(); // Делаю кнопку сабмита неактивной, если инпуты обнулены
    
    addCardPopup.close(); // Закрываю окно редактирования
};

// Создаю класс Section для создания и добавления элементов
const section = new Section({ items: initialCards, renderer: renderCard }, '.elements__list');

const imagePopup = new PopupWithImage('.popup_place_image'); // Создаю класс для открытия окна с картинкой
const editProfilePopup = new PopupWithForm('.popup_place_profile', submitProfile); // Создаю класс для открытия окна редактирования профиля
const addCardPopup = new PopupWithForm('.popup_place_cards', addCard); // Создаю класс для открытия окна добавления карточек

// Класс для управления отображением информации о пользователе на странице
const userInfo = new UserInfo ({ profileNameSelector:'.profile__name', profileBioSelector:'.profile__bio' });

//Подключаю слушателей событий
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

section.renderItems();