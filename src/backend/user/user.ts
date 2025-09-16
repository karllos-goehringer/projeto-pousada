export default class User{
    private _email: string;
    private _name: string;
    private _admin: boolean = false;
    constructor(loggedEmail: string, loggedNameUser: string, admin: number){
        this._email = loggedEmail;
        this._name = loggedNameUser;
        if(admin){
            this._admin = true;
        }else{
            this._admin = false;
        }
    }
    public get email() : string {
        return this._email;
    }
    public get name() : string {
        return this._name;
    }
    public get admin() : boolean {
        return this._admin;
    }
}