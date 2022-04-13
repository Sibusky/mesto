export class Card {
    constructor(data, cardTemplateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
        this._templateCards = document.querySelector(cardTemplateSelector)
            .content.querySelector('.elements__item'); // Template карточки с фотографией
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    };

    deleteCard = () => {
        this._cardElement.remove(); // Удаляю карточку
        this._element = null; // Удаляю ссылку на DOM-элемент
    };

    _setEventListeners() {            
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id)); // Слушатель событий на добавление лайка
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id)); // Слушатель событий на удаление карточки
        this._cardImage.addEventListener('click', () => this._handleImageClick(this._name, this._link)); // Слушатель событий на открытие изображения
    };

    _fillCard() {
        this._cardElement.querySelector('.elements__name').textContent = this._name; // Присваиваю имя карточке
        this._cardImage.alt = this._name; // Присваиваю значение атрибута 'alt'
        this._cardImage.src = this._link; // Присваиваю ссылку карточке
    };
    
    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId) // Ищу, есть ли я среди лайкнувших

        return userHasLikedCard
    }

    _fillLike() {
        this._likeButton.classList.add('elements__like_active')
    }

    _clearLike() {
        this._likeButton.classList.remove('elements__like_active')
    }

    setLikes(newLikes) {
        this._likes = newLikes
        const likeCountElement = this._cardElement.querySelector('.elements__counter')
        likeCountElement.textContent = this._likes.length // Присваиваю длину массива из лайкнувших счётчику лайков

        // Если я есть среди лайкнувших, то сердечко закрашивается,
        // в противном случае - нет.
        if (this.isLiked()){
            this._fillLike()
        } else {
            this._clearLike()
        }
    }

    createCard() {
        this._cardElement = this._templateCards.cloneNode(true); // Клонирую содержимое template
        this._likeButton = this._cardElement.querySelector('.elements__like'); // Нахожу кнопку лайка
        this._deleteButton = this._cardElement.querySelector('.elements__delete-card-button'); // Нахожу кнопку удаления
        this._cardImage = this._cardElement.querySelector('.elements__image'); // Нахожу саму картинку, чтобы можно было на неё клинкуть
    
        this._fillCard();

        this._setEventListeners();

        this.setLikes(this._likes)

        // Если я не создатель карточки, то кнопка удаления исчезает
        if (this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none'
        }

        return this._cardElement; // Возвращаю карточку
    };
}