import axios, { HttpStatusCode } from "axios";

export function setUser(username: string, password: string){
    let token = btoa(username + ':' + password)
    axios.defaults.headers.common['Authorization'] = 'Basic ' + token
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    let data = JSON.stringify({ name: username, password: password })
    localStorage.getItem('login')
    sendJson('/login', 'POST', data)?.then(function() {
        localStorage.setItem('login',token)
        window.location.href = "/client"
    })
}

export function sendJson(endpoint:string,type:string,data:any = null) {
    switch (type) {
        case 'GET':
            return axios.get('http://localhost:8080/api' + endpoint).then(function(reponse) {
                if(reponse.status == HttpStatusCode.Ok){
                    return reponse.data
                }
            }).catch(error => console.error(error))
        
        case 'POST':
            return axios.post('http://localhost:8080/api' + endpoint,data).then(function(reponse) {
                if(reponse.status == HttpStatusCode.Ok){
                    return reponse.data
                }
            }).catch(error => console.error(error))
    
        default:
            break;
    }
}