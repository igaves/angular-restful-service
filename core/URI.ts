export function URI(uri?:string):Function{
    return function(target){
        target.prototype.URI = uri;
    }
}
