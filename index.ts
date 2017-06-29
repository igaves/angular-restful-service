import {NgModule, ModuleWithProviders} from "@angular/core";
import {RestfulService} from "./restful.service";
import {HttpModule,JsonpModule} from "@angular/http";


export * from "./core/GET";
export * from "./core/PATCH";
export * from "./core/PUT";
export * from "./core/POST";
export * from "./core/PATH";
export * from "./core/DELETE";
export * from "./core/QUERY";
export * from "./core/URI";
export * from "./core/JSONP";
export * from './core/BODY';
export * from "./core/HEADERS"
export * from "./core/HEADER"
export * from "./core/WebSocket";


export * from "./core/DATA_TYPE";

export * from './core/ContentType/Multipart';
export * from './core/ContentType/JSON';
export * from './core/ContentType/FormUrlEncoded';

export * from "./restful.service";

const PROVIDERS: any[] = [
    RestfulService
];

@NgModule({
    providers: [PROVIDERS],
    exports: [HttpModule,JsonpModule]
})
export class RestfulServiceModule {
}
