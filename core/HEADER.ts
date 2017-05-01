
export function HEADER(headers:Object){
    return (target,propertyKey:string,descriptor:PropertyDescriptor) => {

        target[`${propertyKey}_headers`] = headers;
    }
}
