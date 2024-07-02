export class User{
    private id:Number
    private name:string;
    private password:string;
    private role:string;

    public constructor(){
        this.id = 0;
        this.name = '';
        this.password = '';
        this.role = '';
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

    public setPassword(password:string){
        this.password = password;
    }

    public getPassword(){
        return this.password;
    }

    public setRole(role:string){
        this.role = role;
    }

    public getRole(){
        return this.role;
    }
}