import { Popup } from './Popup.js';

export class PopupWithImage extends Popup{
    open(name, link) {
        const image = this._popup.querySelector('.popup__image')
        const caption = this._popup.querySelector('.popup__image-title')

        image.src = link
        image.alt = name
        caption.textContent = name

        super.open()
    }

}