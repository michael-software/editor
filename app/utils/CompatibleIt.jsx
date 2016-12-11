export default class CompatibleIt {
    static getStyle(element) {
        return element.currentStyle || window.getComputedStyle(element);
    }
}