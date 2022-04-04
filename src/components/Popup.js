export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = this._popup.querySelector('.popup__close-button')
    }

    open() {
        this._popup.classList.add('popup_opened');

        document.addEventListener('keydown', this._handleEscClose); // Добавляю обработчик нажатия клавиши Esc
    }

    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose); // Удаляю обработчик нажатия клавиши Esc
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            // Закрываю из области overlay (при этом испльзую mousedown а не click), либо нажатием на крестик
            if (evt.target.classList.contains('popup_opened') || evt.target === this._closeButton)
                this.close()
        })
    }
}