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
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
// preventDefault() - убирает дефолтные действия движка (в данном случае - обновление страницы),
// дальше - вставляем данные формы в профиль,
// в конце - закрываем окно редактирования (popup).
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closeProfilePopupEdit();
}

// Добавляю слушателей событий
profileEditButton.addEventListener('click', openProfilePopupEdit);
profilePopupEditClose.addEventListener('click', closeProfilePopupEdit);
formElement.addEventListener('submit', formSubmitHandler);