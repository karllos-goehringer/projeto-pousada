import { RotaBackEnd } from "./routes/privateroute";
import type User from "./user/user";

export  async function pingTest() {
    let url = `${RotaBackEnd}/ping`
                
    const response = await fetch(url);
    const data = await response.json();
}
export  function verifyLogin(user:User|null):boolean{
    if(user?.email != null){
        return true;
    }else{
        return false;
    }
}

export function verifyAdmin(user:User|null):boolean{
    if(user != null && user.admin === true){
        return true;
    }else{
        return false;
    }
}