export default class UserInfo {
  constructor(userInfo) {
    this._nameInfo = document.querySelector(userInfo.nameSelector);
    this._descriptionInfo = document.querySelector(
      userInfo.descriptionSelector
    );
  }

  getUserInfo() {
    // returns object containing user info. use for displaying user data in profile edit modal
    const userInfo = {};
    userInfo.name = this._nameInfo.textContent;
    userInfo.description = this._descriptionInfo.textContent;
    return userInfo;
  }

  setUserInfo(userInfo) {
    // takes new user data and adds it to page. use for submitting profile edit form
    this._nameInfo.textContent = userInfo.name;
    this._descriptionInfo.textContent = userInfo.description;
  }
}
