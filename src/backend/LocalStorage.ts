import User from "./user/user";
class LocalStorage {
    private static _UserLogged: User | null = null;

    public static get UserLogged(): User | null {
        return LocalStorage._UserLogged;
    }

    public static async userdata() {
       return LocalStorage._UserLogged
    }
    public static set UserLogged(User:User|null){
        this._UserLogged = User
    }
}
export default LocalStorage