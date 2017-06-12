export function JSON() {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        let headers = target[`${propertyKey}_headers`];
        if (!headers) headers = {};
        headers["Content-Type"] = 'application/json';
    }
}
