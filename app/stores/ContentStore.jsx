import alt from '../alt';

import {createStore} from 'alt-utils/lib/decorators';
import ContentActions from '../actions/ContentActions';

import CallbackHelper from '../utils/CallbackHelper';

@createStore(alt)
export default class ContentStore {

    static displayName = 'ContentStore';

    constructor() {
        this.bindActions(ContentActions);

        this.state = {
            content: "",
            mime: "text/plain",
            contentFocused: false
        }
    }

    /**
     * Updates the list of todos in the state.
     * @param todos
     */
    setContent(content) {
        this.setState({
            content: content
        });
    }

    save() {
        let content = CallbackHelper.call('content-getContent');


        if(content != undefined) {
            if (this.state.mime != 'text/plain') {
                content = content.replace(/<wbr>/g, '');
                content = content.replace(/<p>/g, '').replace(/<\/p>/g, '<br />');
            }

            // if(this.state.mime == "text/plain") {
            //     content = content.replace(/<br \/>/g, "\n");
            //     content = content.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "\t").replace(/ &nbsp;&nbsp;&nbsp;/g, "\t").replace(/ &nbsp; &nbsp;/g, "\t").replace(/&nbsp; &nbsp; /g, "\t");
            // }

            if (window == window.top) {
                console.log('save', content);
            } else {
                let data = JSON.stringify({
                    'action': 'save',
                    'value': content
                });

                parent.postMessage(data, "*");
            }
        }
    }

    load(data) {
        //var r = confirm("Es wird versucht ein externes Dokument zu laden. Dies kann zu Sicherheitsproblemen führen. Wollen sie fortfahren?");

        let content = data[0];
        let mime = data[1];

        console.log('MIME-Type', mime);

        var r = true;
        if (r == true) {
            // if(mime == "text/plain") {
            //     content = content.replace(/</g, '&lt').replace(/>/g, '&gt;');
            //     content = content.replace(/\n/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            // }

            this.setState({
                mime: mime,
                content: content
            });
        }
    }

    loadUrl(data) {
        let url = data[0];
        let mime = data[1];

        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4) {
                ContentActions.load(xhr.responseText, mime || data.responseType || 'text/plain');
            }
        });

        xhr.open("GET", url);
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send();
    }

    setLastSelection(selection) {
        this.state.selection = selection.getRangeAt(0);

        this.setState({
            contentFocused: false
        });
    }

    setFocused() {
        this.setState({
            contentFocused: true
        });
    }

    lastSelection() {
        let currentRange = this.state.selection;

        if(this.state.selection) {
            let selObj = window.getSelection();
            selObj.removeAllRanges();
            selObj.addRange(currentRange);
        }
    }
}
