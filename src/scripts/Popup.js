export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
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
        const closeButton = this._popup.querySelector('.popup__close-button')
        
        this._popup.addEventListener('mousedown', (evt) => {
            // Закрываю из области overlay (при этом испльзую mousedown а не click), либо нажатием на крестик
            if (evt.target.classList.contains('popup_opened') || evt.target === closeButton)
                this.close()
        })
    }
}