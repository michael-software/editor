export default class MessageHelper {
    static postMessage(object) {
        parent.postMessage(JSON.stringify(object), window.location.origin);
    }
}