const cache = new Map();

export function getData(key:string) {
    if(cache.has(key)){
        return cache.get(key)
    }else{
        return null
    }
}

export function setData(key:string,data:any){
    cache.set(key,data)
}