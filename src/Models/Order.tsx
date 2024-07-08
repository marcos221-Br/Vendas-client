export class Order{
    private id:Number;
    private idClient:Number;

    public constructor(){
        this.id = 0;
        this.idClient = 0;
    }

    public setId(id:Number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setIdClient(idClient:Number){
        this.idClient = idClient;
    }

    public getIdClient(){
        return this.idClient;
    }
}