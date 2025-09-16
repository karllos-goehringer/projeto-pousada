import User from "./user/user";
class LocalStorage {
    private static _UserLogged: User | null = null;

    public static get UserLogged(): User | null {
        return LocalStorage._UserLogged;
    }

    public static set UserLogged(user: User | null) {
        LocalStorage._UserLogged = user;
    }
}
var LocalStorageInstance = LocalStorage;
export default LocalStorageInstance;