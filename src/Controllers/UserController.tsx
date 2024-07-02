import { User } from "../Models/User";
import { sendJson, setHeader } from "../components/Json";

export class UserController{

    public constructor(){
        setHeader('Authorization',localStorage.getItem('token')+"")
    }

    public findUser(name:string){
        return sendJson('/user/' + name,'GET')
    }

    public createUser(user:User){
        let json = JSON.stringify({ name: user.getName(), password: user.getPassword(), role: user.getRole()})
        return sendJson('/user','POST',json)
    }

    public updateUser(user:User){
        let json = JSON.stringify(user)
        return sendJson('/user/' + user.getId(),'PUT',json)
    }

    public deleteUser(user:User){
        return sendJson('/user/' + user.getId(),'DELETE')
    }
}