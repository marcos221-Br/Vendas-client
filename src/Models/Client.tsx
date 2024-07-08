export class Client{
    private id:Number;
    private name:string;
    private cellphone:string;

    public constructor(){
        this.id = 0;
        this.name = '';
        this.cellphone = '';
    }

    public setId(id:Number){
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public setName(name:string){
        this.name = name;
    }

    public getName(){
        return this.name;
    }

    public setCellphone(cellphone:string){
        this.cellphone = cellphone;
    }

    public getCellphone(){
        return this.cellphone;
    }
}