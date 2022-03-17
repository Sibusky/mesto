// Универсальная функция открытия и закрытия окна всех попапов
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); // Добавляю обработчик нажатия клавиши Esc
};

// Функция закрытия окна попапа клавишей Esc
export function closeByEscape(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
};

// Универсальная функция закрытия окна попапа
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); // Удаляю обработчик нажатия клавиши Esc
};