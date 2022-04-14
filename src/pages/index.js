import './index.css'; // импорт главного файла стилей

import {
    profileEditButton,
    formProfileEdit,
    nameInput,
    bioInput,
    cardsAddButton,
    formCarsdAdd,
    avatarImage,
    formEditAvatar,
    initialCards,
    validationConfig,
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js';

let userId // Id юзера для сравнения со своим Id

// Промис для отслеживания выполнения обоих методов класса Api,
// если один не выполнится, то второй тоже
Promise.all([
    api.getProfile(),
    api.getInitialCards()
    ])
    .then(()=>{
        // Получаю данные о пользователе аватаре и Id с сервера
        api.getProfile()
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about);
                userInfo.setUserAvatar(res.avatar);
                userId = res._id
            })
            .catch(err => console.log(`Ошибка: ${err}`));

        // Получаю Initial cards с сервера
        api.getInitialCards()
            .then((cardList) => {
                cardList.forEach((data) => {
                renderCard(data)
                });
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    })
    .catch(err => console.log(`Ошибка: ${err}`));


// Валидация формы редактирования профиля
const editProfileValidator = new FormValidator(validationConfig, formProfileEdit);
// Валидация формы добавления карточки
const addCardValidator = new FormValidator(validationConfig, formCarsdAdd);
// Валидация формы редактирования аватара
const editAvatarValidator = new FormValidator(validationConfig, formEditAvatar);

editProfileValidator.enableValidation(); // Вызываю метод валидации для формы редактирования профиля
addCardValidator.enableValidation(); // Вызываю метод валидации для формы добавления карточки
editAvatarValidator.enableValidation(); // Вызываю метод валидации для формы редактирования аватара


// Функция открытия попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    editProfileValidator.resetErrors(); // Сбрасываю сообщения об ошибках в инпутах, если они были ранее

    const data = userInfo.getUserInfo(); // Получаю данные со страницы в инпуты

    nameInput.value = data.name; // Вставляю содержимое со странцы в инпут
    bioInput.value = data.bio; // Вставляю содержимое со странцы в инпут
    editProfilePopup.open(); // Открываю попап
});

// Функция сабмита формы редактирования профиля
const submitProfile = (data) => {
    // Задаю данные для инпутов
    const profile = {
        name: data['profilename-input'],
        bio: data['bio-input'],
    };

    editProfilePopup.renderLoading(true, 'Сохранение...'); // Меняю текст кнопки сабмита на "Сохранение..."

    api.editProfile(profile.name, profile.bio)
        .then(() => {

            // Вставляю данные имени и описания с сервера
            api.getProfile()
            .then((res) => {
                userInfo.setUserInfo(res.name, res.about); 
            })
            .catch(err => console.log(`Ошибка: ${err}`));

            // Закрываю окно
            editProfilePopup.close(); 
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            editProfilePopup.renderLoading(false, 'Сохранить') // Меняю текст кнопки сабмита на "Сохранить"
        }); 
};

// Функция редактирования аватара
const editAvatar = (data) => {
    // Задаю данные для аватара
    const profile = {
        avatar: data['avatarlink-input']
    };

    editProfilePopup.renderLoading(true, 'Сохранение...'); // Меняю текст кнопки сабмита на "Сохранение..."

    api.editAvatar(profile.avatar)
        .then(() => {

            // Вставляю данные аватара с сервера
            api.getProfile()
            .then((res) => {
                userInfo.setUserAvatar(res.avatar);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
            
            // Закрываю окно
            editAvatarPopup.close(); 
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            editProfilePopup.renderLoading(false, 'Сохранить') // Меняю текст кнопки сабмита на "Сохранить"
        }); 

};

// Функция создания карточки (без добавления на страницу)
const createCard = (data) => {
    // Создаю класс карточки
    const card = new Card(data,
        '.elements__template',
        () => {
            imagePopup.open(data.name, data.link)
        },
        (id) => {
            confirmDeletePopup.open()
            confirmDeletePopup.changeSubmitHendler(() => {

                confirmDeletePopup.renderLoading(true, 'Удаление...'); // Меняю текст кнопки сабмита на "Удаление..."

                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard()
                        confirmDeletePopup.close()
                    })
                    .catch(err => console.log(`Ошибка: ${err}`))
                    .finally(() => {
                        confirmDeletePopup.renderLoading(false, 'Да') // Меняю текст кнопки сабмита на "Да"
                    }); 
            })

        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch(err => console.log(`Ошибка: ${err}`))
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)                        
                    })
                    .catch(err => console.log(`Ошибка: ${err}`))
            }

        }
    ); 
    const cardElement = card.createCard(); // Создаю карточку
    return cardElement; // Возвращаю элемент карточки
};

// Функция загрузки карточки на страницу
const renderCard = (data) => {
    const cardElement = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            });
    section.addItem(cardElement); // Вставляю карточку в начало списка
}; 

// Функция открытия попапа добавления фотографий
cardsAddButton.addEventListener('click', () => {
    addCardValidator.resetErrors();
    addCardPopup.open();
});

// Фукция открытия окна редактирования аватара
avatarImage.addEventListener('click', () => {
    editAvatarValidator.resetErrors();
    editAvatarPopup.open();
});

// Функция добавления новых карточек
const addCard = (data) => {

    addCardPopup.renderLoading(true, 'Создание...'); // Меняю текст кнопки сабмита на "Создание..."

    api.addCard(
        data['placename-input'], 
        data['picturelink-input']
        )
        .then((res) => {
            renderCard(res);

            addCardValidator.toggleButtonState(); // Делаю кнопку сабмита неактивной, если инпуты обнулены

            addCardPopup.close(); // Закрываю окно редактирования
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
            addCardPopup.renderLoading(false, 'Создать') // Меняю текст кнопки сабмита на "Создать"
        });
};

// // Создаю класс Section для создания и добавления элементов
const section = new Section({ items: initialCards, renderer: renderCard }, '.elements__list');

// Создаю класс для открытия окна с картинкой
const imagePopup = new PopupWithImage('.popup_place_image');

// Создаю класс для открытия окна редактирования профиля
const editProfilePopup = new PopupWithForm('.popup_place_profile', submitProfile); 

// Создаю класс для открытия окна добавления карточек
const addCardPopup = new PopupWithForm('.popup_place_cards', addCard);

// Создаю класс для открытия окна подтверждения удаления карточки
const confirmDeletePopup = new PopupWithForm('.popup_place_delete-confirm');

// Создаю класс для открытия окна редактирования аватара
const editAvatarPopup = new PopupWithForm('.popup_place_edit-avatar', editAvatar);

// Создаю класс для управления отображением информации о пользователе на странице
const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileBioSelector: '.profile__bio',
    profileAvatarSelector: '.profile__avatar'
});

//Подключаю слушателей событий к попапам
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
editAvatarPopup.setEventListeners();