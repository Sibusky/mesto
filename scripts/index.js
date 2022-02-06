const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopupEdit = document.querySelector('.popup');
const profilePopupEditClose = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__name');
const bioInput = document.querySelector('.popup__bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

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