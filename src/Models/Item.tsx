export class Item{
    private id:Number;
    private quantity:Number;
    private description:string;
    private value:Number;

    public constructor(){
        this.id = 0;
        this.quantity = 0;
        this.description = '';
        this.value = 0;
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
    
    public setDescription(description:string){
        this.description = description;
    }

    public getDescription(){
        return this.description;
    }

    public setValue(value:Number){
        this.value = value;
    }

    public getValue(){
        return this.value;
    }
}