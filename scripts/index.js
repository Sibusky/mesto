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


console.log(profileEditButton)