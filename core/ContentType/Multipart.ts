export function Multipart() {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        console.warn('angular don\'t support FormData,use XMLHTTPRequest instead');

        if (!target[`${propertyKey}_headers`]) {
            target[`${propertyKey}_headers`] = {};
        }
        target[`${propertyKey}_headers`]["Content-Type"] = "multipart/form-data";
    }
}
