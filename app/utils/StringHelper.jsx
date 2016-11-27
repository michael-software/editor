export default class StringHelper {
    static isTab(string) {
        return (string == '\xa0\xa0\xa0\xa0' || string == ' \xa0 \xa0'  || string == ' \xa0\xa0\xa0');
    }
}