import {RequestMethod} from "@angular/http";
import {createRequest} from "./_REQUEST";
import {DATA_TYPE} from "./DATA_TYPE";

export const JSONP_METHOD = 1000;
export function JSONP<T>(url?:string,dataType:number=DATA_TYPE.json){
    return createRequest<T>(JSONP_METHOD,dataType,url);
}
