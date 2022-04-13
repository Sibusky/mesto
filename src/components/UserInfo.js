export class UserInfo {
    constructor({ profileNameSelector, profileBioSelector, profileAvatarSelector }) {
        this._nameElement = document.querySelector(profileNameSelector)
        this._bioElement = document.querySelector(profileBioSelector)
        this._avatarElement = document.querySelector(profileAvatarSelector)
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            bio: this._bioElement.textContent,
        }
    }

    setUserInfo(name, bio) {
        this._nameElement.textContent = name
        this._bioElement.textContent = bio
    }

    setUserAvatar(avatar) {
        this._avatarElement.src = avatar
    }
}