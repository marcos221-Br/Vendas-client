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
        let json = JSON.stringify({ quantity: item.getQuantity(), description: item.getDescription(), size: item.getSize(), value: item.getValue(), order: { id: item.getIdOrder() } });
        return sendJson('/item','POST',json);
    }

    public updateItem(item:Item){
        let json = JSON.stringify({ id: item.getId(), quantity: item.getQuantity(), description: item.getDescription(), size: item.getSize(), value: item.getValue(), order: { id: item.getIdOrder() } });
        return sendJson('/item/' + item.getId(),'PUT',json);
    }

    public deleteItem(item:Item){
        return sendJson('/item/' + item.getId(),'DELETE');
    }
}