import {URLSearchParams, Headers, RequestOptions, RequestMethod, Request, Http, Response, Jsonp} from "@angular/http";
import {PATH_KEYS} from "./PATH";
import {JSONP_METHOD} from "./JSONP";
import {DATA_TYPE} from "./DATA_TYPE";

import 'rxjs/add/operator/map';
import {QueryValueIndex} from "./QUERY";

/**
 * rest 错误
 */
export class RestServiceError extends Error{
    constructor(public message:string){
        super();
    }
}
/**
 * 修正请求的query string
 * @param target
 * @param propertyKey
 * @returns {URLSearchParams} -请求的对应函数处理
 */
function getURLSearchParams(target,propertyKey:string,args:any[]):URLSearchParams{
    let params = new URLSearchParams();

    //这里做个
    let queryIndex = target[`${propertyKey}_query`]||[];

    for(let i=0;i<queryIndex.length;i++){

        let queryStore:number|QueryValueIndex = queryIndex[i];

        //也就说，queryparam是单值，需要用queryStore.key作为key
        if(typeof queryStore == 'object'){
            params.set(queryStore.key,args[queryStore.index]);
        }else{
            let queryParam = args[queryIndex[i]];
            for(var key in queryParam){
                params.set(key,queryParam[key]);
            }
        }
    }


    return params;
}

/**
 * 修正请求的url地址
 * @param url
 * @param target
 * @param propertyKey
 * @returns {string}
 */
function getPathString(target,propertyKey:string,args:any[]){
    let url:string = target[`${propertyKey}_url`];

    let paths:Object = target[`${propertyKey}_path`];
    for(let key in paths){
        if(key == PATH_KEYS.default){
            url = url.replace(/:[^\/]+/,args[paths[key]]);
        }else{
            url = url.replace(`:${key}`,args[paths[key]]);
        }
    }

    return url;
}

/**
 * 获取头信息
 * @returns {Headers}
 */
function getHeaders(target,propertyKey):Headers{
    let headers = {
        'Accept': 'application/json',
        "Content-Type":'application/x-www-form-urlencoded'
    };
    let propertyHeaders = target[`${propertyKey}_headers`]||{};

    for(let key in propertyHeaders){
        headers[key] = propertyHeaders[key];
    }
    return new Headers(headers);
}


function execByFilter(content:any,callName:string,afterFilter:Function,afterFilterExcept:string[]){

    if(afterFilterExcept.indexOf(callName)>-1){
        content = afterFilter(content);
    }

    return content;
}
/**
 * 根据contentType来处理  分别为form-data, x-www-form-urlencoded ,raw
 * @param target
 * @param propertyKey
 * @returns {any}
 */
function getBody(target: any, propertyKey: string,headers:Headers,args:any[]) {
    let contentType = headers.get('Content-Type');

    let body = args[target[`${propertyKey}_body`]]||{};
    let returnBody:any;



    if(/form\-data/i.test(contentType)){
        let fd = new FormData();
        for(let key in body){
            let value = body[key];
            fd.append(key,body[key],'1.jpeg');

        }
        returnBody = fd;
    }else if(/urlencoded/i.test(contentType)){
        returnBody = toParam(body);
    }else{
        if(typeof body == 'object'){
            returnBody = JSON.stringify(body);
        }else{
            returnBody = body;
        }
    }
    return returnBody;
}

/**
 *  thanks for jquery#$.param
 *  to Param for post.
 * @param body
 * @returns {string}
 */
function toParam(body) {
    let s = [], rbracket = /\[\]$/;
    let isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    let add = function (k, v) {
        v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
        s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    };
    let buildParams = function (prefix, obj) {
        let i, len, key;

        if (prefix) {
            if (isArray(obj)) {
                for (i = 0, len = obj.length; i < len; i++) {
                    if (rbracket.test(prefix)) {
                        add(prefix, obj[i]);
                    } else {
                        buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
                    }
                }
            } else if (obj && String(obj) === '[object Object]') {
                for (key in obj) {
                    buildParams(prefix + '[' + key + ']', obj[key]);
                }
            } else {
                add(prefix, obj);
            }
        } else if (isArray(obj)) {
            for (i = 0, len = obj.length; i < len; i++) {
                add(obj[i].name, obj[i].value);
            }
        } else {
            for (key in obj) {
                buildParams(key, obj[key]);
            }
        }
        return s;
    };
    return buildParams('', body).join('&').replace(/%20/g, '+');
}

/**
 * 修正jsonp问题
 * issue: https://github.com/angular/angular/issues/3183
 * @param url
 * @returns {string}
 */
function resolveJSONPCallback(url:string){
    if(/callback/i.test(url)){
        url.replace(/callback=$(\w+)/i,'callback=JSONP_CALLBACK');
    }else{
        let split = '?';
        if(/\?/.test(url)){
            split = '&';
        }
        url += split+'callback=JSONP_CALLBACK';
    }
    return url;
}
/**
 * 动态创建各种 GET PATCH DELETE PUT OPTION POST Decorator
 * @param method {number} -请求ID 来自于 RequestMethod
 * @returns {function(RestService, string, PropertyDescriptor)}
 */
export function createRequest<T>(method:number,dataType:DATA_TYPE,url?:string):Function{


    return function(target,propertyKey:string,descriptor:PropertyDescriptor){
        if(url){
            target[`${propertyKey}_url`] = url;
        }
        descriptor.value = function(...args:any[]){

            let requestUrl:string = this.URI;
            //如果已经有url了，替换掉URI
            if(Reflect.has(target,`${propertyKey}_url`)){

                //替换对应URI
                let url = target[`${propertyKey}_url`];
                if(!/^(http[s]?:|ws:|\/)/.test(url)){
                    target[`${propertyKey}_url`] = this.URI+'/'+url;
                }

                //修理一下，这里可以用标准的target,property处理
                requestUrl = getPathString(target,propertyKey,args);
            }

            //queryString
            let searchParams:URLSearchParams = getURLSearchParams(target,propertyKey,args);
            //还没写
            let headers:Headers = getHeaders(target,propertyKey);


            let requestTarget:Http;
            if(method == JSONP_METHOD){
                requestTarget = this.jsonp;
                headers.set('Accept','text/javascript');
                method = RequestMethod.Get;

                requestUrl= resolveJSONPCallback(requestUrl);
            }else{
                requestTarget = this.http;
            }

            let body = getBody(target,propertyKey,headers,args);

            let requestOptions:RequestOptions = new RequestOptions({
                url:requestUrl,
                headers:headers,
                method:method,
                body:body,
                search:searchParams
            });


            if(this.beforeFilterExcept.indexOf(propertyKey)==-1){
                this.beforeFilter(requestOptions);
            }


            let request:Request = new Request(requestOptions);

            let observable = requestTarget.request(request);

            //set return type
            //noinspection TypeScriptValidateTypes
            return observable.map((res:Response)=>{
                let returnValue:any = res;
                if(dataType == DATA_TYPE.json)  returnValue = res.json();
                if(dataType == DATA_TYPE.arrayBuffer) returnValue = res.arrayBuffer();
                if(dataType == DATA_TYPE.text) returnValue = res.text();
                if(dataType == DATA_TYPE.blob) returnValue = res.blob();

                if(this.afterFilterExcept.indexOf(propertyKey)==-1){
                    returnValue = this.afterFilter(returnValue);
                }

                return returnValue as T;
            });
        }
    }
}
