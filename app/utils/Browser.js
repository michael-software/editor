export default class Browser {

    static isOpera() {
        return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    }

    static isFirefox() {
        return typeof InstallTrigger !== 'undefined';
    }

    static isSafari() {
        return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    }

    static isChrome() {
        return !!window.chrome && !!window.chrome.webstore;
    }

    static isBlink() {
        return (isChrome || isOpera) && !!window.CSS;
    }

    static getBrowser() {

        if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 )
        {
            return {name: 'opera'};
        }
        else if(navigator.userAgent.indexOf("Chrome") != -1 )
        {
            return {name: 'chrome'};
        }
        else if(navigator.userAgent.indexOf("Safari") != -1)
        {
            return {name: 'safari'};
        }
        else if(navigator.userAgent.indexOf("Firefox") != -1 )
        {
            return {name: 'firefox'};
        }
        else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) //IF IE > 10
        {
            return {name: 'ie'};
        }
        else if(window.navigator.userAgent.indexOf("Edge") > -1) {
            return {name: 'edge'};
        } else
        {
            return {name: 'unknown'};
        }
    }
}