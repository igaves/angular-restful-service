export const PATH_KEYS={
    default:"__DEFAULT__"
};
export function PATH(key:string=PATH_KEYS.default){
    return (target,propertyKey:string,index:number) => {

        if(!target[`${propertyKey}_path`]){
            target[`${propertyKey}_path`] = {};
        }
        target[`${propertyKey}_path`][key] = index
    }
}
