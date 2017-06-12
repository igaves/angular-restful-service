
export function HEADER(headers:Object){
    console.warn('HEADER is deprecated ,please use HEADERS instead');
    return (target,propertyKey:string,descriptor:PropertyDescriptor) => {

        target[`${propertyKey}_headers`] = headers;
    }
}
