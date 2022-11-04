import {StorageKeys} from "./StorageKeys";

class UserStorage {
    static saveUser(user) {
        localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
    }

    static getUser() {
        const value = JSON.stringify(localStorage.getItem(StorageKeys.USER)) || {};
        return JSON.parse(value);
    }

    static removeUser() {
        localStorage.removeItem(StorageKeys.USER);
    }
}

export default UserStorage;