import { Order } from "../Models/Order";
import { sendJson, setHeader } from "../components/Json";

export class OrderController{

    public constructor(){
        setHeader('Authorization',sessionStorage.getItem('token')+"")
    }

    public findOrders(idClient:Number){
        return sendJson('/order/' + idClient,'GET')
    }

    public createOrder(order:Order){
        let json = JSON.stringify({ progress: order.getProgress(), client: { id: order.getIdClient() }})
        return sendJson('/order','POST',json)
    }

    public updateOrder(order:Order){
        let json = JSON.stringify({ id: order.getId(), date: order.getDate(), progress: order.getProgress(), client: { id: order.getIdClient() }})
        return sendJson('/order/' + order.getId(),'PUT',json);
    }

    public deleteOrder(order:Order){
        return sendJson('/order/' + order.getId(),'DELETE')
    }
}