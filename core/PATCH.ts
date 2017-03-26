import {RequestMethod} from "@angular/http";
import {createRequest} from "./_REQUEST";
import {DATA_TYPE} from "./DATA_TYPE";

export function PATCH(url?:string,dataType:number=DATA_TYPE.json){
    return createRequest(RequestMethod.Patch,dataType,url);
}
