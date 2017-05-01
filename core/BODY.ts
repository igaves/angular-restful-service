export function BODY(){
    return (target,propertyKey:string,index:number) => {

        target[`${propertyKey}_body`] = index;
    }
}
