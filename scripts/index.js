import { imagePopup, 
    imageTitle, 
    openImagePopup, 
    popups, 
    profileEditButton, 
    profilePopupEdit,
    formProfileEdit,
    nameInput,
    bioInput,
    profileName,
    profileBio,
    cardsAddButton,
    cardsPopup,
    formCarsdAdd,
    placeName,
    picLink,
    cardsList,
    initialCards,
    validationConfig 
} from './constants.js'
import { openPopup, closePopup } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js'

const editProfileValidator = new FormValidator(validationConfig, formProfileEdit); // Валидация формы редактирования профиля
const addCardValidator = new FormValidator(validationConfig, formCarsdAdd); // Валидация формы добавления карточки

editProfileValidator.enableValidation(); // Вызываю метод валидации для формы редактирования профиля
addCardValidator.enableValidation(); // Вызываю метод валидации для формы добавления карточки

// Прохожусь по массиву попапов
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        // и закрываю из области overlay, при этом испльзую mousedown а не click
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
    editProfileValidator.resetErrors(); // Сбрасываю сообщения об ошибках в инпутах, если они были ранее
    nameInput.value = profileName.textContent; // Вставляю содержимое в форму
    bioInput.value = profileBio.textContent; // Вставляю содержимое в форму
    openPopup(profilePopupEdit); // Открываю попап
}); 

// Функция отправки формы профиля
const submitProfile = () => {
    profileName.textContent = nameInput.value; // Вставляю имя в профиль
    profileBio.textContent = bioInput.value; // Вставляю профессию в профиль
    closePopup(profilePopupEdit); // Закрываем окно редактирования (popup) профиля
};

// Функция открытия попапа с изображением
const handleImageClick = (name, link) => { 
    imagePopup.src = link; // Присваиваю картинке ссылку
    imagePopup.alt = name; // Присваиваю картинке значение атрибута 'alt'
    imageTitle.textContent = name; // Присваиваю название картинки
    openPopup(openImagePopup); // Открываю попап
};

// Функция создания карточки
const renderCard = (data) => {
    const card = new Card(data, '.elements__template', handleImageClick); // Создаю класс карточки
    const cardElement = card.createCard(); // Создаю карточку
    cardsList.prepend(cardElement); // Вставляю карточку в начало списка
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
