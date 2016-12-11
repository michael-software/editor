export default class MessageHelper {
    static postMessage(object) {
        parent.postMessage(JSON.stringify(data), window.location.origin);
    }
}