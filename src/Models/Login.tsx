export class Login {

    static username:string
    static password:string
    static token:string

    constructor(username:string,password:string,token:string) {
        Login.username = username;
        Login.password = password;
        Login.token = token;  
    }
}