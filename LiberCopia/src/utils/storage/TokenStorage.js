import {StorageKeys} from "./StorageKeys";

class TokenStorage {
    static saveToken(token) {
        localStorage.setItem(StorageKeys.TOKENS, JSON.stringify(token));
    }

    static getToken() {
        return  localStorage.getItem(StorageKeys.TOKENS) || "";

    }

    static removeToken() {
        localStorage.removeItem(StorageKeys.TOKENS);
    }
}

export default TokenStorage