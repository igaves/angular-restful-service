## RestService For Angular 

@version 0.3.34demo.

Angular Restful Injectable Service 。



## usage
    npm install angular-restful-service --save
    
### change logs 0.3.40 add QUERY's param

```typescript  
     @GET('/assets')
    getById(@QUERY('id') id:number){ return null}
    
    //equal
    @GET('/assets')
    getBy(@QUERY() params:Object){ return null}
    


### change logs 0.3.34 deprecated `~`,use `/` instead

```typescript  
     @POST('/assets')
    uploadAssets(@Body() formData){ return null}
        
    
### change logs 0.3.33

add ContentType decorator
    FormUrlEncoded/JSON/Multipart
    
```typescript  

    @Multipart()
    @POST('/assets')
    uploadAssets(@Body() formData){ return null}
```
### change logs 0.3.32

add ContentType decorator

```typescript  

    @Multipart()
    @POST('/assets')
    uploadAssets(@Body() formData){ return null}
```
   
add HEADERS decorator

```typescript    

    @HEADERS({'Content-Type','application/json'}) 
    
```    

### change logs 0.3.31

fixed BODY mark from array to index

add HEADERS decorator

```typescript    

    @HEADERS({'Content-Type','application/json'})
```    

### change logs 0.2.28
Add beforeFilter,you can modify all Response attributes in request;

```typescript    
    public beforeFilter(res:Response):void{
        let headers = res.headers;
        headers.set(
            'X-CSRF-Token',
            document.querySelector('meta[name=csrf-token]').getAttribute('content')
        );
    }
```    
    
### change logs 0.2.27
Add @BODY for function

```typescript    
    
    @POST('/:id');
    function setValueOf(@PATH() id:number,@BODY() props:Object){return null}
    
```    
    
the default Content-Type is *application/x-www-form-urlencoded*,you can use @HEADER set the request header.
such as form-data / raw

### change logs 0.2.23

add  filter for Response,in Service you can defined *afterFilter* for your own purpose

throw some error is recommended in *afterFilter*

```typescript    
    
    public afterFilter(res){
        if(res.response.code>0){
            throw new UINoticeError(`请求失败(${res.response.code})，错误为${res.response.message}`); 
        }
        return res.data;
    }
```    

Also you can add some function definition name in service as exception statement .

```typescript    

    public afterFilterExcept = ['findById','query'];
    
```    
    
### change logs 0.22.22
Add jsonp method

```typescript    

    @JSONP("http://external.api.com/some/api/entity")
    private getExternal<T>(){return null}
``` 

    
Add response Type for body , just for using Response#json()/text()/arrayBuffer()/blod()
```typescript    
    @GET('/api/article/:id/text','text')
    public getTextById(@PATH() id:number){ return null}
```    

### change logs 0.21

@PATH param can be empty if only one @PATH in arguments; 

```typescript    
    @GET('/tags/:name')
    public getByTagName(@PATH() name:string){return null}
```

@Query param can be empty if only one  in arguments; 

```typescript    
    @GET('/tags/:id')
    public getByTagName(@PATH() name:string,@QUERY() params:Object){return null}
```
    
    
Usage:

```typescript    
    @Injectable()
    @URI('/api/articles');
    class ArticleService extends RestService{
    
        constructor(){
            super();
        }
        
        
        @GET("/article_list");
        public getArticleList():Observable<Article[]>{return null}
        
        @GET("/article_list/:name");
        public findArticleList(
            @PATH("name") name:string,
            @QUERY() parms:Object
        ):Observable<Article[]>{return null}
        
        @JSONP("http://api.com/article_list/:name");
        public findArticleList(
            @PATH("name") name:string,
            @QUERY() parms:Object
        ):Observable<Article[]>{return null}
    }
```
    
Usabe:
    
    
    
   
    
```typescript      
    this.articleService.find(+param['id']).subscribe(article=> this.article = article);
```
    
    
