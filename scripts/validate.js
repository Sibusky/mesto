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
function toggleButtonState(inputList, buttonElement) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // Кнопка становится неактивной
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    // В противном случае кнопка активная
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
} 

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
  
// Вызываю функцию валидации
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}); 