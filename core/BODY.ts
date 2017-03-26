export function BODY(){
    return (target,propertyKey:string,index:number) => {
        if(!target[`${propertyKey}_body`]){
            target[`${propertyKey}_body`] = [];
        }
        target[`${propertyKey}_body`].push(index);
    }
}
