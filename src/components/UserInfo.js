export class UserInfo {
    constructor({ profileNameSelector, profileBioSelector }) {
        this._nameElement = document.querySelector(profileNameSelector)
        this._bioElement = document.querySelector(profileBioSelector)
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            bio: this._bioElement.textContent
        }
    }

    setUserInfo(name, bio) {
        this._nameElement.textContent = name
        this._bioElement.textContent = bio
    }
}