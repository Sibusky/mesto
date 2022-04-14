export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;

        const { inputSelector, submitButtonSelector } = this._settings // Достаю из объекта settings поля inputSelector, submitButtonSelector,
        // можно это не делать, а просто использовать аргументы  this._settings.inputSelector и this._settings.submitButtonSelector, но так изящнее.

        // Нахожу все поля формы и делаю из них массив
        this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
        // Нахожу в текущей форме кнопку
        this._buttonElement = this._form.querySelector(submitButtonSelector);
    };

    _hasInvalidInput() {
        // Прохожу по массиву методом some
        return this._inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
          // Обход массива прекратится и вся фунцкция
          // hasInvalidInput вернёт true  
          return !inputElement.validity.valid;
        })
    }; 

    toggleButtonState() {
        const { inactiveButtonClass } = this._settings

        // Если есть хотя бы один невалидный инпут
        if (this._hasInvalidInput()) {
          // Кнопка становится неактивной
          this._buttonElement.classList.add(inactiveButtonClass);
          this._buttonElement.setAttribute('disabled', true);
        } else {
          // В противном случае кнопка активная
          this._buttonElement.classList.remove(inactiveButtonClass);
          this._buttonElement.removeAttribute('disabled');
        }
    };

    _showInputError(inputElement, errorMessage) {
        const { inputErrorClass, errorClass } = this._settings 
        
        const errorElement = this._form.querySelector(`.${inputElement.name}-error`); // Нахожу элемент ошибки внутри самой функции
        inputElement.classList.add(inputErrorClass); // Добавляю красную рамку снизу инпута
        errorElement.textContent = errorMessage; // Добавляю стандартный текст об ошибке ввода
        errorElement.classList.add(errorClass); // Добавляю стили стандартному тексту об ошибке
      };

    _hideInputError(inputElement) {
        const { inputErrorClass, errorClass } = this._settings
        
        const errorElement = this._form.querySelector(`.${inputElement.name}-error`); // Нахожу элемент ошибки внутри самой функции
        inputElement.classList.remove(inputErrorClass); // Удаляю красную рамку снизу инпута
        errorElement.classList.remove(errorClass); // Удаляю стили стандартного текста об ошибке
        errorElement.textContent = '';// Обнуляю стандартный текст об ошибке ввода
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage); // Если поле не проходит валидацию, показывает ошибку
        } else {
          this._hideInputError(inputElement); // Если проходит, скрывает ошибку
        }
    };

    _setEventListeners() {
        // Делаю кнопку сабмита неактивной с самого начала
        this.toggleButtonState();
        // Обхожу все элементы массива
        this._inputList.forEach((inputElement) => {
          // каждому полю добавляю обработчик события input
          inputElement.addEventListener('input', () => {
            // Внутри колбэка вызываю checkInputValidity,
            // передав ей форму и проверяемый элемент
            this._checkInputValidity(inputElement);
            // Делаю кнопку сабмита неактивной
            this.toggleButtonState()
          });
        });
    };

    enableValidation() {
         this._setEventListeners();
    };

    resetErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
        this.toggleButtonState();
    }
};
