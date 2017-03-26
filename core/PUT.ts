import {RequestMethod} from "@angular/http";
import {createRequest} from "./_REQUEST";
import {DATA_TYPE} from "./DATA_TYPE";

export function PUT(url?:string,dataType:DATA_TYPE=DATA_TYPE.json){
    return createRequest(RequestMethod.Put,dataType,url);
}
