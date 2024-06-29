import axios, { HttpStatusCode } from "axios";
import { Login } from "../Models/Login";
import { setData } from "./Cache";

export function setUser(username: string, password: string){
    let token = btoa(username + ':' + password)
    axios.defaults.headers.common['Authorization'] = 'Basic ' + token
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    let data = JSON.stringify({ name: username, password: password })
    if(sendJson('login', 'POST', data) != null){
        setData("login",new Login(username,password,token))
    }
}

export function sendJson(endpoint:string,type:string,data:any = null) {
    switch (type) {
        case 'GET':
            return axios.get('http://localhost:8080/api/' + endpoint).then(function(reponse) {
                if(reponse.status == HttpStatusCode.Ok){
                    return reponse.data
                }else{
                    return null
                }
            })
        
        case 'POST':
            return axios.post('http://localhost:8080/api/' + endpoint,data).then(function(reponse) {
                if(reponse.status == HttpStatusCode.Ok){
                    return reponse.data
                }else{
                    return null
                }
            })
    
        default:
            break;
    }
}