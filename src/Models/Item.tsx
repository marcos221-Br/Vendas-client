export class Item{
    private id:Number;
    private quantity:Number;
    private description:String;
    private size:String
    private value:Number;
    private idOrder:Number;

    public constructor(){
        this.id = 0;
        this.quantity = 0;
        this.description = '';
        this.value = 0;
        this.idOrder = 0;
        this.size = '';
    }

    public setId(id:Number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setQuantity(quantity:Number){
        this.quantity = quantity;
    }

    public getQuantity(){
        return this.quantity;
    }
    
    public setDescription(description:String){
        this.description = description;
    }

    public getDescription(){
        return this.description;
    }

    public setSize(size:String){
        this.size = size;
    }

    public getSize(){
        return this.size;
    }

    public setValue(value:Number){
        this.value = value;
    }

    public getValue(){
        return this.value;
    }

    public setIdOrder(idOrder:Number){
        this.idOrder = idOrder;
    }

    public getIdOrder(){
        return this.idOrder;
    }
}