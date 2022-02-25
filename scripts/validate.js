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