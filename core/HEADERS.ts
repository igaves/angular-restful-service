
export function HEADERS(headers:Object){
    return (target,propertyKey:string,descriptor:PropertyDescriptor) => {
        if (!target[`${propertyKey}_headers`]) {
            target[`${propertyKey}_headers`] = {};
        }
        for(let key in headers){
            target[`${propertyKey}_headers`][key] = headers[key];
        }
    }
}
