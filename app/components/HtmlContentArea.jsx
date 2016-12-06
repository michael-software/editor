import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import Browser from '../utils/Browser';

import ContentStore from '../stores/ContentStore';
import ContentActions from '../actions/ContentActions';

import CallbackHelper from '../utils/CallbackHelper';

import StringHelper from '../utils/StringHelper';

import './HtmlContentArea.scss';

@connectToStores
export default class HtmlContentArea extends React.Component {

    constructor() {
        super();
    }

    static getStores() {
        return [ContentStore];
    }

    static getPropsFromStores() {
        return assign({},
            ContentStore.getState()
        );
    }

    render() {
        return(
            <div className="content-area-container">
                <div ref={(div) => this._editor = div}
                     className="content-area"
                     contentEditable="true"
                     onKeyDown={this._onKeyDown.bind(this)}
                     onKeyUp={this._onKeyUp.bind(this)}
                     onChange={this._onKeyUp.bind(this)}
                     dangerouslySetInnerHTML={{__html: this.props.content}}>
                </div>
            </div>
        );
    }

    _focus() {
        //this._editor.focus();
        if(this._lastRange) {
            let selObj = window.getSelection();
            selObj.removeAllRanges();
            selObj.addRange(this._lastRange);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return true;
    }

    componentDidMount() {
        CallbackHelper.register("content-focus", this._focus.bind(this), true);
        CallbackHelper.register("content-getContent", this._getContent.bind(this), true);

        this._editor.focus();

        this._editor.addEventListener('blur', (event) => {
            this._lastRange = window.getSelection().getRangeAt(0);
        }, false);


        this._editor.addEventListener('focus', (event) => {
            ContentActions.setFocused.defer();
        }, false);
    }

    _onKeyDown(event) {
        console.log(event.keyCode);

        let selection = window.getSelection();

        if (event.keyCode === 13) { // return

            console.log(selection.anchorNode.tagName, selection.anchorNode.parentNode.tagName);

            if(selection.anchorNode.parentNode.tagName.toLowerCase() == 'li') {

                return;
            }

            if(Browser.getBrowser().name != 'ie')
                event.preventDefault();

            if(Browser.isChrome()) {
                document.execCommand('insertHTML', false, '<br><br>');
            } else if(Browser.getBrowser().name == 'edge') {
                document.execCommand('insertHTML', false, "<br><wbr>");
            }
            return false;
        } else if(event.keyCode == 8) { //delete
            if(selection.anchorOffset - 4 >= 0) {
                let anchorOffset = selection.anchorOffset;

                let lastFour = selection.anchorNode.nodeValue.slice(selection.anchorOffset-4, selection.anchorOffset);

                if(StringHelper.isTab(lastFour)) { // using non-breaking-space in UTF
                    selection.anchorNode.nodeValue = selection.anchorNode.nodeValue.slice(0, anchorOffset-4) + selection.anchorNode.nodeValue.slice(anchorOffset, selection.anchorNode.nodeValue.length);

                    let range = document.createRange();
                    range.setStart(selection.anchorNode, anchorOffset-4);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    event.preventDefault();
                    return false;
                }
            }
        } else if(event.keyCode == 9) { //tab
            event.preventDefault();

            document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');

            return false;
        } else if(event.keyCode == 37) { // left arrow
            let selection = window.getSelection();

            if(selection.anchorOffset - 4 >= 0) {
                let anchorOffset = selection.anchorOffset;

                let lastFour = selection.anchorNode.nodeValue.slice(selection.anchorOffset-4, selection.anchorOffset);

                if(StringHelper.isTab(lastFour)) { // using non-breaking-space in UTF
                    let range = document.createRange();
                    range.setStart(selection.anchorNode, anchorOffset-4);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    event.preventDefault();
                    return false;
                }
            }
        } else if(event.keyCode == 39) { // left arrow
            let selection = window.getSelection();

            if(selection.anchorNode.nodeValue && selection.anchorOffset + 4 <= selection.anchorNode.nodeValue.length) {
                let anchorOffset = selection.anchorOffset;

                let lastFour = selection.anchorNode.nodeValue.slice(selection.anchorOffset, selection.anchorOffset+4);

                if(StringHelper.isTab(lastFour)) { // using non-breaking-space in UTF
                    let range = document.createRange();
                    range.setStart(selection.anchorNode, anchorOffset+4);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);

                    event.preventDefault();
                    return false;
                }
            }
        }
    }

    _getContent() {
        return this._editor.innerHTML;
    }

    _onKeyUp() {
    }
}