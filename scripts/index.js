const profileEditButton = document.querySelector('.profile__edit-button')
const profilePopupEdit = document.querySelector('.popup')
const profilePopupEditClose = document.querySelector('.popup__close-button')


function openProfilePopupEdit(event) {
    profilePopupEdit.classList.add('popup_opened')
}

function closeProfilePopupEdit() {
    profilePopupEdit.classList.remove('popup_opened')
}


profileEditButton.addEventListener('click', openProfilePopupEdit)
profilePopupEditClose.addEventListener('click', closeProfilePopupEdit)

profilePopupEdit.addEventListener('click', function(event) {
    if(event.target === event.currentTarget) {
        closeProfilePopupEdit()
    }
})

let formElement = document.querySelector('.popup__container')  
let nameInput = document.querySelector('.popup__name')   
let bioInput = document.querySelector('.popup__bio')
let profileName = document.querySelector('.profile__name')
let profileBio = document.querySelector('.profile__bio')

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    closeProfilePopupEdit();
}

formElement.addEventListener('submit', formSubmitHandler);