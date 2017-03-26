export function QUERY(){
    return (target,propertyKey:string,index:number) => {
        if(!target[`${propertyKey}_query`]){
            target[`${propertyKey}_query`] = [];
        }
        target[`${propertyKey}_query`].push(index);
    }
}
