export interface QueryValueIndex {
    index:number
    key:string
}
export function QUERY(key?:string){
    return (target,propertyKey:string,index:number) => {
        if(!target[`${propertyKey}_query`]){
            target[`${propertyKey}_query`] = [];
        }

        /**
         * 这里稍微调整了一下，如果@QUERY("url") url:string,会存一下{index:,key:}
         * 其余要求是存index，直接拿param<Object>
         */
        if(key){
            let queryValue:QueryValueIndex = {
                index:index,
                key:key
            };
            target[`${propertyKey}_query`].push(queryValue);
        }else{
            target[`${propertyKey}_query`].push(index);
        }
    }
}
