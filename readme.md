# RestfulService For Angular 

@version 0.2.27

Angular Restful Injectable Service 。

 1. CURD Method in Service
 2. Do Something Before / After A Request
 3. [Methods Provided In **RestfulService**.

### usage:
    npm install --save angular-restful-service@latest

  note: all function is defined in my service

#### @URI 

> defiend the URI of restful resource

    @Injectable()
    @URI("/entities")
    class MyService extends RestfulService{
        constructor(private http:Http,private jsonp:Jsonp){
            super(http,jsonp);
        }
    }
    
*Jsonp is optional for service*

### CURD Method in Service

**keyword in restful service:**
> @GET/@POST/@DELETE/@PATCH/@PUT are provided

> @QUERY/@PATH/@BODY


Request Method 

    @GET();
    public allMyData(){ return null }
    
use ~ instead URI value
*'~/active' **equal** '/entities/active'*

    @GET('~/active')
    public allActives(){ return null };
    
use @PATH to defined the URL 
    
    @GET("~/:id/users")
    public allUsersById(@PATH() id:number|string){return null}
    this.service.allUsersById(params['id']).subscribe(...)

use @BODY to defined post/put/patch body

    @POST("~/:id/users")
    public addUser(@PATH() id:number|string,@BODY user:USER){return null}
    
    //then in component
    let user:User = formedUser();
    this.service.addUser(params["id"],user).subscribe(...)
    
user @QUERY to defiend query params

    @get("~/:id/users")
    public getUsers(@PATH() id:number|string,@QUERY params:Object){return null}
    
    //then in component
    this.service.getUsers(params["id"],{
        page:1,
        offset:234
    }).subscribe(...);
  
 you can set the request type
 
    // text/json/arrayBuffer/blob
     @get("~/notice",DATA_TYPE.text)
     public getNotice(){return null}
    
 @HEADER
    set request headers attributes
    
    default :
    *'Accept': 'application/json',
    'Content-Type':'application/x-www-form-urlencoded'*
    
usage:

    @POST("~/:id/images")
    @HEADER("Content-Type","multipart/form-data")
    public addImage(@PATH() id:number|string,@BODY params:Object){return null}
    
    this.service.addImage(params["id"],{
        file:input.file[0],
        code:102
    }).subscribe(...);
    
    

### Do Something Before / After A Request

> Override beforeFilter in your service.

    function beforeFilter(requestOptions:RequestOptions):void{
        requestOptions.headers.set('csrf-token',getToken());
        
        //or you can rebuild your request body
        refresh(requestOptions.body);
    }
    

> Override afterFilter in your service. your subscribe's content is
> indead the return value of  this function.

    function afterFilter(response:Response):any{
       
        //or you can rebuild your response body
        let json = response.json();
        if(json.code == 0){
            return json.data;
        }else{
            throw new Error(json.message);
        }
    }


### Methods Provided In **RestfulService**.

> functions are  defined in RestfulService  you can override all of
> them,or just use them.

    @GET()
    public findBy<T>(@QUERY() params:Object):Observable<T>{ return null}

    @GET("~/:id")
    public find<T>(@PATH() id:string|number):Observable<T>{ return null}
    
    @GET()
    public where<T>(@QUERY() params:Object):Observable<T>{return null}


    @GET()
    public query<T>(@QUERY() conditions:Object={}):Observable<T>{ return null}


    @GET()
    public all<T>(){return null}
    
    @POST()
    public create<T>(@BODY() model:T){return null}


    @PUT("~/:id")
    public update<T>(@PATH() id:number|string,@BODY() model:T){return null}

    @PATCH('~/:id')
    public patch<T>(@PATH() id:number|string,@BODY() property:Object){return null}
    
    @DELETE('~/:id')
    public delete<T>(@PATH() id:string){return null}
    
    
**License MIT**
