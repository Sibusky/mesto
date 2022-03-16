class Card {
    constructor(data, cardTemplateSelector) {
        this._templateCards = document.querySelector(cardTemplateSelector).content; // Template карточки с фотографией
        this._name = data.name;
        this._link = data.link;
    };

    addLike = () => {
        this._likeButton.classList.toggle('elements__like_active')
    };

    createCard() {
        const newCard = this._templateCards.cloneNode(true); // Клонирую содержимое template
        this._likeButton = cardElement.querySelector('.elements__like'); // Нахожу кномку лайка
    
        newCard.querySelector('.elements__name').textContent = this._name; // Присваиваю имя карточке
        newCard.querySelector('.elements__image').alt = this._name; // Присваиваю значение атрибута 'alt'
        newCard.querySelector('.elements__image').src = this._link; // Присваиваю ссылку карточке
    
        newCard.querySelector('.elements__like').addEventListener('click', addLike); // Слушатель событий на добавление лайка
        newCard.querySelector('.elements__delete-card-button').addEventListener('click', deleteCard); // Слушатель событий на удаление карточки
        newCard.querySelector('.elements__image').addEventListener('click', openImage); // Слушатель событий на открытие изображения
    
        return newCard; // Возвращаю карточку
    };
}