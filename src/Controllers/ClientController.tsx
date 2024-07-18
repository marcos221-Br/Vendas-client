import { Client } from "../Models/Client";
import { sendJson, setHeader } from "../components/Json";

export class ClientController{

    public constructor(){
        setHeader('Authorization',sessionStorage.getItem('token')+"")
    }

    public findClient(search:string){
        return sendJson('/client/' + search,'GET')
    }

    public createClient(client:Client){
        let json = JSON.stringify({ name: client.getName(), cellphone: client.getCellphone() })
        return sendJson('/client','POST',json)
    }

    public updateClient(client:Client){
        let json = JSON.stringify(client)
        return sendJson('/client/' + client.getId(),'PUT',json)
    }

    public deleteClient(client:Client){
        return sendJson('/client/' + client.getId(),'DELETE')
    }
}