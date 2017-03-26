import {NgModule, ModuleWithProviders} from "@angular/core";
import {RestfulService} from "./restful.service";
import {HttpModule} from "@angular/http";


export * from "./core/GET";
export * from "./core/PATCH";
export * from "./core/PUT";
export * from "./core/POST";
export * from "./core/PATH";
export * from "./core/DELETE";
export * from "./core/QUERY";
export * from "./core/URI";
export * from "./core/JSONP";
export * from "./core/DATA_TYPE";

export * from "./restful.service";

const PROVIDERS: any[] = [
    RestfulService
];

@NgModule({
    providers: [PROVIDERS],
    exports: [HttpModule]
})
export class RestfulServiceModule {
}
