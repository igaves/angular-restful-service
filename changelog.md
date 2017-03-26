## XCMS RestService For Angular 

@version 0.2.21 demo.

Angular Restful Injectable Service 。


## usage
    npm install angular-restful-service --save
   
### change logs 0.2.28
Add beforeFilter,you can modify all Response attributes in request;
    public beforeFilter(res:Response):void{
        let headers = res.headers;
        headers.set(
            'X-CSRF-Token',
            document.querySelector('meta[name=csrf-token]').getAttribute('content')
        );
    }
    
### change logs 0.2.27
Add @BODY for function
    @POST('~/:id');
    function setValueOf(@PATH() id:number,@BODY() props:Object){return null}
    
the default Content-Type is *application/x-www-form-urlencoded*,you can use @HEADER set the request header.
such as form-data / raw

### change logs 0.2.23

add  filter for Response,in Service you can defined *afterFilter* for your own purpose

throw some error is recommended in *afterFilter*
    
    public afterFilter(res){
        if(res.response.code>0){
            throw new UINoticeError(`请求失败(${res.response.code})，错误为${res.response.message}`); 
        }
        return res.data;
    }

Also you can add some function definition name in service as exception statement .

    public afterFilterExcept = ['findById','query'];
    
    
### change logs 0.22.22
Add jsonp method

    @JSONP("http://external.api.com/some/api/entity")
    private getExternal<T>(){return null}
    
Add response Type for body , just for using Response#json()/text()/arrayBuffer()/blod()

    @GET('/api/article/:id/text','text')
    public getTextById(@PATH() id:number){ return null}
    
### change logs 0.21
You can use * ~ * instead Service's URI definition.

    @URI("/api/v2/comments")
    Class SomeService{}
    
    // equal
    
    @GET('~/:name')==@Get("/api/v2/comments/:name")
    
### change logs 0.2

@PATH param can be empty if only one @PATH in arguments; 

    @GET('/tags/:name')
    public getByTagName(@PATH() name:string){return null}

@Query param can be empty if only one  in arguments; 
    
    @GET('/tags/:id')
    public getByTagName(@PATH() name:string,@QUERY() params:Object){return null}
    
    
Usage:
    
    @Injectable()
    @URI('/api/articles');
    class ArticleService extends RestService{
    
        constructor(){
            super();
        }
        
        
        @GET("/api/article_list");
        public getArticleList():Observable<Article[]>{return null}
        
        @GET("/api/article_list/:name");
        public findArticleList(
            @PATH("name") name:string,
            @QUERY() parms:Object
        ):Observable<Article[]>{return null}
        
        //jsonp
        @GET("/api/article_list/:name");
        @HEADER({'content-type':"application/javascript");
        public findArticleList(
            @PATH("name") name:string,
            @QUERY() parms:Object
        ):Observable<Article[]>{return null}
    }

    
Usabe:
    
    
    
   
    
    
    this.articleService.find(+param['id']).subscribe(article=> this.article = article);

    
    
    
