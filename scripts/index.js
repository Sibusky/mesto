const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupEdit = document.querySelector('.popup');
const profilePopupEditClose = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const bioInput = document.querySelector('.popup__input_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
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

// Функция открытия popup. Присваивает класс 'popup_opened' со свойством display: flex,
// и вставляет данные из профиля в popup.
function openProfilePopupEdit() {
    profilePopupEdit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
};

// Функция закрытия popup; удаляет класс 'popup_opened'.
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
function formSubmitHandler (evt) {
    evt.preventDefault(); // Убирает дефолтные действия движка (в данном случае - обновление страницы)
    profileName.textContent = nameInput.value; // Вставляем имя в профиль
    profileBio.textContent = bioInput.value; // Вставляем профессию в профиль
    closeProfilePopupEdit(); // Закрываем окно редактирования (popup)
}


const templateCards = document.querySelector('.elements__template').content
const cardsList = document.querySelector('.elements__list')


// Функция добавления карточек по умолчанию
function render() {
    initialCards.forEach(renderCard);
}

// Функция добавления отдельной карточки
function renderCard(card) {
    const newCard = templateCards.cloneNode(true); // Клонирую содержимое template
    newCard.querySelector('.elements__name').textContent = card.name // Присваиваю имя карточке
    newCard.querySelector('.elements__image').src = card.link // Присваиваю ссылку карточке

    cardsList.prepend(newCard) // Добавляю карточку в начало списка
}

render()







// Добавляю слушателей событий
profileEditButton.addEventListener('click', openProfilePopupEdit);
profilePopupEditClose.addEventListener('click', closeProfilePopupEdit);
formElement.addEventListener('submit', formSubmitHandler);

