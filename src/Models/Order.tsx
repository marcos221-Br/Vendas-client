export class Order{
    private id:Number;
    private date:String;
    private idClient:Number;
    private progress:String

    public constructor(){
        this.id = 0;
        this.date = '';
        this.idClient = 0;
        this.progress = '';
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

    public setProgress(progress:String){
        this.progress = progress;
    }

    public getProgress(){
        return this.progress;
    }

    public setDate(date:String){
        this.date = date;
    }

    public getDate(){
        return this.date;
    }
}