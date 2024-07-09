import { Item } from "../Models/Item";
import { sendJson, setHeader } from "../components/Json";

export class ItemController{

    public constructor(){
        setHeader('Authorization',sessionStorage.getItem('token')+"");
    }

    public findItens(idOrder:Number){
        return sendJson('/item/' + idOrder,'GET');
    }

    public createItem(item:Item){
        let json = JSON.stringify
    }
}