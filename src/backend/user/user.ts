export default class User{
    private _id:number;
    private _email: string;
    private _name: string;
    private _admin: boolean = false;
    constructor(loggedEmail: string, loggedNameUser: string, admin: number,id:number){
        this._id = id;
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
    public get id() : number {
        return this._id;
    }
}