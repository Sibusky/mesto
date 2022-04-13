import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)
        this._handleSubmit = handleSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = [...this._popup.querySelectorAll('.popup__input')]        
    }

    _getInputValues() {
        const values = {}
        this._inputs.forEach((input) => {
            values[input.name] = input.value
        })

        return values;
    }

    changeSubmitHendler(newSubmitHendler) {
        this._handleSubmit = newSubmitHendler
    }

    renderLoading(isLoading) {
        this._saveButton = this._popup.querySelector('.popup__save-button')

        if (isLoading) {
          this._saveButton.textContent = 'Сохранение...'
        } else {
            this._saveButton.textContent = 'Сохранить'
        }
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (e) => {
            e.preventDefault()
            this._handleSubmit(this._getInputValues())
        })
    }

    close() {
        super.close()
        this._form.reset()
    }
}