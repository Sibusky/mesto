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
      name: 'Северная Осетия',
      link: 'https://images.unsplash.com/photo-1612719734820-81784b7e6573?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
    },
    {
      name: 'Судак',
      link: 'https://images.unsplash.com/photo-1565342403875-07a8dc5ed13c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://images.unsplash.com/photo-1537690381844-9da2b0b69640?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2129&q=80'
    },
    {
      name: 'Уральские горы',
      link: 'https://images.unsplash.com/photo-1504609732-6c1d0f28bf16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2129&q=80'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1548130729-90d4d11826f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    }
  ]; 

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


// Функция отправки формы:
function formProfileSubmitHandler(evt) {
    evt.preventDefault(); // Убирает дефолтные действия движка (в данном случае - обновление страницы)
    profileName.textContent = nameInput.value; // Вставляем имя в профиль
    profileBio.textContent = bioInput.value; // Вставляем профессию в профиль
    closeProfilePopupEdit(); // Закрываем окно редактирования (popup)
}

// Функция добавления карточек по умолчанию
function render() {
    initialCards.forEach(renderCard);
}

let newCard

// Функция добавления отдельной карточки
function renderCard(card) {
    newCard = templateCards.cloneNode(true); // Клонирую содержимое template
    newCard.querySelector('.elements__name').textContent = card.name // Присваиваю имя карточке
    newCard.querySelector('.elements__image').alt = card.name // Присваиваю значение атрибута 'alt'
    newCard.querySelector('.elements__image').src = card.link // Присваиваю ссылку карточке


    cardsList.prepend(newCard) // Добавляю карточку в начало списка
}

render()

// Функция открытия окна попапа добавления карточек
function openAddCardPopup() {
    cardsPopup.classList.add('popup_opened');
};

// Функция закрытия попапа добавления карточек
function closeAddCardPopup() {
  cardsPopup.classList.remove('popup_opened');
};

function formCardsSubmitHandler(evt) {
  evt.preventDefault(); // Убирает дефолтные действия движка (в данном случае - обновление страницы)
  newCard = templateCards.cloneNode(true); // Клонирую содержимое template
  newCard.querySelector('.elements__name').textContent = placeName.value 
  newCard.querySelector('.elements__image').alt = placeName.value
  newCard.querySelector('.elements__image').src = picLink.value
  
  cardsList.prepend(newCard)

  closeAddCardPopup() // Закрываем окно редактирования
}





// Добавляю слушателей событий
profileEditButton.addEventListener('click', openProfilePopupEdit); // Слушатель событий кнопки открытия попапа редактирования профиля
profilePopupEditClose.addEventListener('click', closeProfilePopupEdit); // Слушатель событий кнопки закрытия попапа редактирования профиля
formProfileEdit.addEventListener('submit', formProfileSubmitHandler); //Слушатель событий отправки формы данных профиля

cardsAddButton.addEventListener('click', openAddCardPopup) // Слушатель событий кнопки добавления картинок
cardsPopupCloseButton.addEventListener('click', closeAddCardPopup) // Слушатель событий кнопки закрытия попапа добавления картинок
formCarsdAdd.addEventListener('submit', formCardsSubmitHandler) // Слушатель событий отправки формы для добавления карточек




// Сделать функцию под слушатели событий???