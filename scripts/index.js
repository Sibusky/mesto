const profileEditButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const profilePopupEdit = document.querySelector('.popup_place_profile'); // Попап редактирования профиля
const profilePopupEditClose = document.querySelector('.popup__close-button_place_profile'); // Кнопка закрытия попапа редактирования профиля
const formProfileEdit = document.querySelector('.popup__form_place_profile'); // Форма редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name'); // Ввод данных имени
const bioInput = document.querySelector('.popup__input_type_bio'); // Ввод данных профессии
const profileName = document.querySelector('.profile__name'); // Имя профиля на самой странице
const profileBio = document.querySelector('.profile__bio'); // Профессия профиля на самой странице

const cardsAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточек
const cardsPopup = document.querySelector('.popup_place_cards'); // Попап добавления карточек
const cardsPopupCloseButton = document.querySelector('.popup__close-button_place_cards'); //Кнопка закрытия попапа добавления карточек
const formCarsdAdd = document.querySelector('.popup__form_place_card'); // Форма добавления карточек
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

const openImagePopup = document.querySelector('.popup_place_image'); // Попап с фотографией 
const closeImagePopup = document.querySelector('.popup__close-button_place_image'); // Кнопка закрытия попапа с изображнием
const imagePopup = document.querySelector('.popup__image'); // Открытая фотография
const imageTitle = document.querySelector('.popup__image-title'); // Название открытой фотографии

const closePopupFromOverlay = (popup) => {
    popup.addEventListener('mousedown', function(event) {
        if(event.target === event.currentTarget) {
            popup.classList.remove('popup_opened');
        }
    })
};

const closePopupByEsc = (popup) => {
    document.addEventListener('keydown', function(event) {
        if(event.key === 'Escape') {
            popup.classList.remove('popup_opened');
        }
    })
};

const closePopupByCloseButton = (popup) => {
    const closeButton = popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', function() {
        popup.classList.remove('popup_opened');
    })
}



// Функция открытия окна попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    closePopupFromOverlay(popup);
    closePopupByEsc(popup);
    closePopupByCloseButton(popup);
};

// Общая функция закрытия окна попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

// Функция открытия попапа редактирования профиля
function openProfilePopupEdit() {
    openPopup(profilePopupEdit);
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
};

// Функция закрытия попапа редактирования профиля
//function closeProfilePopupEdit() {
   // closePopup(profilePopupEdit);
//};








// Функция отправки формы профиля
function submitProfile(event) {
    profileName.textContent = nameInput.value; // Вставляем имя в профиль
    profileBio.textContent = bioInput.value; // Вставляем профессию в профиль
    closeProfilePopupEdit(); // Закрываем окно редактирования (popup)
};

// Функция добавления лайка
function addLike(event) {
    event.target.closest('.elements__like').classList.toggle('elements__like_active')
};

// Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.elements__item').remove();
};

// Функция создания карточки
function createCard(card) {
    const newCard = templateCards.cloneNode(true); // Клонирую содержимое template

    newCard.querySelector('.elements__name').textContent = card.name; // Присваиваю имя карточке
    newCard.querySelector('.elements__image').alt = card.name; // Присваиваю значение атрибута 'alt'
    newCard.querySelector('.elements__image').src = card.link; // Присваиваю ссылку карточке

    newCard.querySelector('.elements__like').addEventListener('click', addLike); // Слушатель событий на добавление лайка
    newCard.querySelector('.elements__delete-card-button').addEventListener('click', deleteCard); // Слушатель событий на удаление карточки
    newCard.querySelector('.elements__image').addEventListener('click', openImage); // Слушатель событий на открытие изображения

    return newCard; // Возвращаю карточку
};

// Функция добавления карточки "из коробки"
function addDefaultCard(card) {
    cardsList.append(createCard(card)); // Добавляю карточку "из коробки" в конец списка
};

// Функция добавления всех карточек "из коробки" на страницу
function addAllDefaultCards() {
    initialCards.forEach(addDefaultCard);
};

addAllDefaultCards(); // Вызываю функцию добавления всех карточек "из коробки"

// Функция открытия окна попапа добавления карточек
function openAddCardPopup() {
    openPopup(cardsPopup);
};

// Функция закрытия попапа добавления карточек
function closeAddCardPopup() {
    closePopup(cardsPopup);
};

// Функция добавления новых карточек
function addCard(event) {
    // Формирую объект для функции renderCard, потому что на вход она принимает объекты!
    const cardName = placeName.value;
    const cardLink = picLink.value;
    const card = {
        name: cardName, 
        link: cardLink
    };
     
    const newCard = createCard(card); // Создаю новую карточку
    
    cardsList.prepend(newCard) // Добавляю карточку в начало списка
   
    placeName.value = ''; // Обнуляю инпуты
    picLink.value = ''; // Обнуляю инпуты

    closeAddCardPopup(); // Закрываю окно редактирования
};

// Функция открытия попапа с изображением
function openImage(event) {
    openPopup(openImagePopup); // Открываю попап
    imagePopup.src = event.target.closest('.elements__image').src; // Присваиваю картинке ссылку
    imagePopup.alt = event.target.closest('.elements__image').alt; // Присваиваю картинке значение атрибута 'alt'
    imageTitle.textContent = event.target.closest('.elements__image').alt; // Присваиваю название картинки
};

// Функция закрытия попапа с изображением
function closeImage() {
    openImagePopup.classList.remove('popup_opened');
};

// Добавляю слушателей событий для попапов
profileEditButton.addEventListener('click', openProfilePopupEdit); // Слушатель событий кнопки открытия попапа редактирования профиля
//profilePopupEditClose.addEventListener('click', closeProfilePopupEdit); // Слушатель событий кнопки закрытия попапа редактирования профиля
formProfileEdit.addEventListener('submit', submitProfile); //Слушатель событий отправки формы данных профиля

cardsAddButton.addEventListener('click', openAddCardPopup) // Слушатель событий кнопки добавления картинок
//cardsPopupCloseButton.addEventListener('click', closeAddCardPopup) // Слушатель событий кнопки закрытия попапа добавления картинок
formCarsdAdd.addEventListener('submit', addCard) // Слушатель событий отправки формы для добавления карточек

closeImagePopup.addEventListener('click', closeImage) // Слушатель событий кнопки закрытия изображения





//Начинаю ВАЛИДАЦИЮ

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`); // Нахожу элемент ошибки внутри самой функции
    inputElement.classList.add('popup__input_type_error'); // Добавляю красную рамку снизу инпута
    errorElement.textContent = errorMessage; // Добавляю стандартный текст об ошибке ввода
    errorElement.classList.add('popup__input-error_active'); // Добавляю стили стандартному тексту об ошибке
  };
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`); // Нахожу элемент ошибки внутри самой функции
    inputElement.classList.remove('popup__input_type_error'); // Удаляю красную рамку снизу инпута
    errorElement.classList.remove('popup__input-error_active'); // Удаляю стили стандартного текста об ошибке
    errorElement.textContent = '';// Обнуляю стандартный текст об ошибке ввода
};
  
// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage); // Если поле не проходит валидацию, показывает ошибку
    } else {
      hideInputError(formElement, inputElement); // Если проходит, скрывает ошибку
    }
};
 


// Функция, которая ищет невалидные инпуты
const hasInvalidInput = (inputList) => {
    // Прохожу по массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true  
      return !inputElement.validity.valid;
    })
}; 


// Функция для переключения состояния кнопки в зависимости от валидности полей
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // Кнопка становится неактивной
      buttonElement.classList.add('popup__save-button_inactive');
      buttonElement.setAttribute('disabled', true)
    } else {
      // В противном случае кнопка активная
      buttonElement.classList.remove('popup__save-button_inactive');
      buttonElement.removeAttribute('disabled')
    }
}; 





// Функция слушатель для любого инпута
const setEventListeners = (formElement) => {
    // Нахожу все поля формы и делаю из них массив
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    // Нахожу в текущей форме кнопку
    const buttonElement = formElement.querySelector('.popup__save-button');
    // Делаю кнопку сабмита неактивной с самого начала
    toggleButtonState(inputList, buttonElement);
    // Обхожу все элементы массива
    inputList.forEach((inputElement) => {
      // каждому полю добавляю обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызываю checkInputValidity,
        // передав ей форму и проверяемый элемент
        checkInputValidity(formElement, inputElement);
        // Делаю кнопку сабмита неактивной
        toggleButtonState(inputList, buttonElement)
      });
    });
};

//Функция запуска валидации формы
const enableValidation = () => {
    // Нахожу все формы и делаю из них массив
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // Перебираю полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменяю стандартное поведение
        evt.preventDefault();
      });
      // Для каждой формы вызваю функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
};
  
// Вызываю функцию
enableValidation(); 