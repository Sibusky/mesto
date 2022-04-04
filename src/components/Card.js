export class Card {
    constructor(data, cardTemplateSelector, handleImageClick) {
        this._templateCards = document.querySelector(cardTemplateSelector)
            .content.querySelector('.elements__item'); // Template карточки с фотографией
        this._name = data.name;
        this._link = data.link;
        this._handleImageClick = handleImageClick;
    };

    _addLike = () => {
        this._likeButton.classList.toggle('elements__like_active')
    };

    _deleteCard = () => {
        this._cardElement.remove(); // Удаляю карточку
        this._element = null; // Удаляю ссылку на DOM-элемент
    };

    _setEventListeners() {            
        this._likeButton.addEventListener('click', this._addLike); // Слушатель событий на добавление лайка
        this._deleteButton.addEventListener('click', this._deleteCard); // Слушатель событий на удаление карточки
        this._cardImage.addEventListener('click', () => this._handleImageClick(this._name, this._link)); // Слушатель событий на открытие изображения
    };

    _fillCard() {
        this._cardElement.querySelector('.elements__name').textContent = this._name; // Присваиваю имя карточке
        this._cardImage.alt = this._name; // Присваиваю значение атрибута 'alt'
        this._cardImage.src = this._link; // Присваиваю ссылку карточке
    };

    createCard() {
        this._cardElement = this._templateCards.cloneNode(true); // Клонирую содержимое template
        this._likeButton = this._cardElement.querySelector('.elements__like'); // Нахожу кнопку лайка
        this._deleteButton = this._cardElement.querySelector('.elements__delete-card-button'); // Нахожу кнопку удаления
        this._cardImage = this._cardElement.querySelector('.elements__image'); // Нахожу саму картинку, чтобы можно было на неё клинкуть
    
        this._fillCard();

        this._setEventListeners();

        return this._cardElement; // Возвращаю карточку
    };
}