import { Client } from "../Models/Client";
import { sendJson, setHeader } from "../components/Json";

export class ClientController{

    public constructor(){
        setHeader('Authorization',localStorage.getItem('token')+"")
    }

    public findClient(cellphone:string){
        return sendJson('/client/' + cellphone,'GET')
    }

    public createUser(client:Client){
        let json = JSON.stringify({ name: client.getName(), cellphone: client.getCellphone() })
        return sendJson('/client','POST',json)
    }

    public updateUser(client:Client){
        let json = JSON.stringify(client)
        return sendJson('/client/' + client.getId(),'PUT',json)
    }

    public deleteUser(client:Client){
        return sendJson('/client/' + client.getId(),'DELETE')
    }
}