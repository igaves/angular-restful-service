export function FormUrlEncoded() {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        let headers = target[`${propertyKey}_headers`];
        if (!headers) headers = {};
        headers["Content-Type"] = 'application/x-www-form-urlencoded';
    }
}
