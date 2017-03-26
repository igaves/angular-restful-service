import {Http, Jsonp, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {QUERY} from "./core/QUERY";
import {GET} from "./core/GET";
import {PATH} from "./core/PATH";
import {DELETE} from "./core/DELETE";
import {POST} from "./core/POST";
import {PUT} from "./core/PUT";
import {PATCH} from "./core/PATCH";
import {BODY} from "./core/BODY";


/**
 * @see http://www.typescriptlang.org/docs/handbook/decorators.html
 */
@Injectable()
export class RestfulService{
    protected http:Http;
    protected jsonp:Jsonp;

    //不在filter列表内的处理方式
    protected afterFilterExcept:string[]=[];

    constructor(http:Http,jsonp?:Jsonp){}

    /**
     * @override
     * 数据过滤方式
     * @param content
     * @returns {any}
     */
    protected afterFilter(content:any):any{
        return content
    }

    /**
     * @override
     * @param response
     */
    protected beforeFilter(response:Response):void{
    }
    /**
     * 查找满足条件 第一条
     * @param param
     */
    @GET()
    public findBy<T>(@QUERY() params:Object):Observable<T>{ return null}

    /**
     * 根据主键ID 查找第一条
     * @param id
     */
    @GET("~/:id")
    public find<T>(@PATH() id:string|number):Observable<T>{ return null}
    /**
     * 根据条件查找
     * @param conditions
     */
    @GET()
    public where<T>(@QUERY() params:Object):Observable<T>{return null}

    /**
     * 必须return，否则提醒Type Void
     * @alias where
     * @param conditions
     */
    @GET()
    public query<T>(@QUERY() conditions:Object={}):Observable<T>{ return null}


    /**
     * query all collection
     */
    @GET()
    public all<T>(){return null}
    /**
     *  create an entity
     * @param model<T>
     */
    @POST()
    public create<T>(@BODY() model:T){return null}

    /**
     * update an entity
     * @param id
     * @param model<T>
     */
    @PUT("~/:id")
    public update<T>(@PATH() id:number|string,@BODY() model:T){return null}

    @PATCH('~/:id')
    public patch<T>(@PATH() id:number|string,@BODY() property:Object){return null}
    /**
     * delete
     * @param id
     */
    @DELETE('~/:id')
    public delete<T>(@PATH() id:string){return null}
}
