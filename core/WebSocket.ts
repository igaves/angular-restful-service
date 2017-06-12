import {RequestMethod} from "@angular/http";
import {createRequest} from "./_REQUEST";
import {DATA_TYPE} from "./DATA_TYPE";

export function WebSocket(url?:string,dataType:DATA_TYPE=DATA_TYPE.json){

    return function(target,propertyKey:string,descriptor:PropertyDescriptor){
        if(url){
            target[`${propertyKey}_url`] = url;
        }

        descriptor.value = function (...args:any[]) {

        }
    }
}
