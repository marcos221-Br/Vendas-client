import axios, { HttpStatusCode } from "axios";

export function setHeader(key:string,value:string){
    axios.defaults.headers.common[key] = value
}

export function sendJson(endpoint:string,type:string,data:any = null):Promise<any> {
    let result:any
    switch (type) {
        case 'GET':
            result = axios.get('http://localhost:8080/api' + endpoint).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;
        
        case 'POST':
            result = axios.post('http://localhost:8080/api' + endpoint,data).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;
        
        case 'PUT':
            result = axios.put('http://localhost:8080/api' + endpoint,data).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;

        case 'DELETE':
            result = axios.delete('http://localhost:8080/api' + endpoint).then(function(response) {
                if(response.status == HttpStatusCode.Ok){
                    return response.data
                }
            }).catch(error => console.error(error))
            break;
    
        default:
            break;
    }
    return result
}