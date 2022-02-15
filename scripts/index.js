const profileEditButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const profilePopupEdit = document.querySelector('.popup_place_profile'); // Попап редактирования профиля
const profilePopupEditClose = document.querySelector('.popup__close-button_place_profile'); // Кнопка закрытия попапа редактирования профиля
const formProfileEdit = document.querySelector('.popup__form_place_profile'); // Форма редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name'); // Ввод данных имени
const bioInput = document.querySelector('.popup__input_type_bio'); // Ввод данных профессии
const profileName = document.querySelector('.profile__name'); // Имя профиля на самой странице
const profileBio = document.querySelector('.profile__bio'); // Профессия профиля на самой странице

const cardsAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления фотографий
const cardsPopup = document.querySelector('.popup_place_cards'); // Попап добавления фотографий
const cardsPopupCloseButton = document.querySelector('.popup__close-button_place_cards'); //Кнопка закрытия попапа добавления фотографий
const formCarsdAdd = document.querySelector('.popup__form_place_card'); // Форма добавления фотографии
const placeName = document.querySelector('.popup__input_type_place-name'); // Ввод данных имени места
const picLink = document.querySelector('.popup__input_type_link'); // Ввод данных ссылки на картинку

const templateCards = document.querySelector('.elements__template').content; // Template карточки с фотографией
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

let newCard; // Объявляю переменную новой карточки

const openImagePopup = document.querySelector('.popup_place_image'); // Попап с фотографией 
const closeImagePopup = document.querySelector('.popup__close-button_place_image'); // Кнопка закрытия попапа с изображнием
const imagePopup = document.querySelector('.popup__image'); // Открытая фотография
const imageTitle = document.querySelector('.popup__image-title'); // Название открытой фотографии

// Функция открытия попап редактирования профиля. Присваивает класс 'popup_opened' со свойством display: flex,
// и вставляет данные из профиля на странице в попап редактирования профиля.
function openProfilePopupEdit() {
    profilePopupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
};

// Функция закрытия попапа редактирования профиля; удаляет класс 'popup_opened'.
function closeProfilePopupEdit() {
    profilePopupEdit.classList.remove('popup_opened');
};

// Функция закрытия popup при клике вне окна. Работает не вовсем корректно:
// при нажатии в области окна, а отпускании вне, окно закроется,
// что может привести к ложным закрытиям окна при выделении текста в input
/* profilePopupEdit.addEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
        closeProfilePopupEdit()
    }
}); */

// Функция отправки формы профиля
function formProfileSubmitHandler(event) {
    event.preventDefault(); // Убирает дефолтные действия движка (в данном случае - обновление страницы)
    profileName.textContent = nameInput.value; // Вставляем имя в профиль
    profileBio.textContent = bioInput.value; // Вставляем профессию в профиль
    closeProfilePopupEdit(); // Закрываем окно редактирования (popup)
};

// Функция добавления отдельной карточки "из коробки"
function renderCard(card) {
    newCard = templateCards.cloneNode(true); // Клонирую содержимое template
    newCard.querySelector('.elements__name').textContent = card.name; // Присваиваю имя карточке
    newCard.querySelector('.elements__image').alt = card.name; // Присваиваю значение атрибута 'alt'
    newCard.querySelector('.elements__image').src = card.link; // Присваиваю ссылку карточке
   
    addListeners(newCard); // Добавляю карточкам слушателей кликов по кнопке удаления и по кнопке лайка

    cardsList.append(newCard) // Добавляю карточку "из коробки" в конец списка
};



// Функция добавления всех карточек "из коробки"
function renderDefault() {
    initialCards.forEach(renderCard);
};

renderDefault(); // Вызываю функцию добавления всех карточек "из коробки"

// Функция открытия окна попапа добавления карточек
function openAddCardPopup() {
    cardsPopup.classList.add('popup_opened');
};

// Функция закрытия попапа добавления карточек
function closeAddCardPopup() {
    cardsPopup.classList.remove('popup_opened');
};

// Функция добавления новых карточек
function formCardsSubmit(event) {
    event.preventDefault(); // Убирает дефолтные действия движка (в данном случае - обновление страницы)
    newCard = templateCards.cloneNode(true); // Клонирую содержимое template
    newCard.querySelector('.elements__name').textContent = placeName.value; // Вставляю имя карточки из input
    newCard.querySelector('.elements__image').alt = placeName.value; // Вставляю значение тега 'alt'
    newCard.querySelector('.elements__image').src = picLink.value; // Вставляю ссылку на изображение

    addListeners(newCard); // Добавляю карточкам слушателей кликов по кнопке удаления и по кнопке лайка
    cardsList.prepend(newCard); // Вставляю карточку в начало списка
    closeAddCardPopup(); // Закрываю окно редактирования
};


// Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.elements__item').remove();
};

// Функция добавления лайка
function addLike(event) {
    event.target.closest('.elements__like').classList.toggle('elements__like_active')
};

// Функция открытия попапа с изображением
function openImage(event) {
    openImagePopup.classList.add('popup_opened');
    imagePopup.src = event.target.closest('.elements__image').src
    imagePopup.alt = event.target.closest('.elements__image').alt
    imageTitle.textContent = event.target.closest('.elements__image').alt
};

// Функция закрытия попапа с изображением
function closeImage() {
    openImagePopup.classList.remove('popup_opened');
}

// Добавляю слушателей событий для попапов
profileEditButton.addEventListener('click', openProfilePopupEdit); // Слушатель событий кнопки открытия попапа редактирования профиля
profilePopupEditClose.addEventListener('click', closeProfilePopupEdit); // Слушатель событий кнопки закрытия попапа редактирования профиля
formProfileEdit.addEventListener('submit', formProfileSubmitHandler); //Слушатель событий отправки формы данных профиля

cardsAddButton.addEventListener('click', openAddCardPopup) // Слушатель событий кнопки добавления картинок
cardsPopupCloseButton.addEventListener('click', closeAddCardPopup) // Слушатель событий кнопки закрытия попапа добавления картинок
formCarsdAdd.addEventListener('submit', formCardsSubmit) // Слушатель событий отправки формы для добавления карточек

closeImagePopup.addEventListener('click', closeImage) // Слушатель событий кнопки закрытия изображения



// Добавляю слушателей событий для лайков и удаления карточек
function addListeners(el) {
  el.querySelector('.elements__like').addEventListener('click', addLike);
  el.querySelector('.elements__delete-card-button').addEventListener('click', deleteCard);
  el.querySelector('.elements__image').addEventListener('click', openImage)
};




/*

document.querySelector('.elements__delete-card-button').addEventListener('click', function() {
  console.log('clicked')
})

*/

// Сделать функцию под слушатели событий???