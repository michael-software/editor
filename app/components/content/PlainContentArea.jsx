import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import ContentStore from '../../stores/ContentStore';
import ContentActions from '../../actions/ContentActions';

import CallbackHelper from '../../utils/CallbackHelper';


import './PlainContentArea.scss';

@connectToStores
export default class PlainContentArea extends React.Component {

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
                <textarea className="content-area"
                          ref={(textarea) => this._textarea = textarea}
                          defaultValue={this.props.content}
                          onKeyUp={this._onKeyUp.bind(this)}
                          onKeyDown={this._onKeyDown.bind(this)} >
                </textarea>
            </div>
        );
    }

    componentDidUpdate() {
        this._textarea.value = this.props.content;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.content == this._textarea.value) {
            return false;
        }

        return true;
    }

    componentDidMount() {
        CallbackHelper.register("content-focus", this._focus.bind(this), true);
        CallbackHelper.register("content-getContent", this._getContent.bind(this), true);
        CallbackHelper.register("content-getElement", this._getElement.bind(this), true);

        this._textarea.focus();
        this._resize();

        this._textarea.addEventListener('paste', (event) => {
            window.setTimeout(() => {
                this._resize();
            }, 0);
        });

        this._textarea.addEventListener('blur', (event) => {
            if(this._textarea)
            this._lastRange = {
                start: this._textarea.selectionStart,
                end: this._textarea.selectionEnd
            };
        }, false);
    }

    _getElement() {
        return this._textarea;
    }

    _resize() {
        let offset = 20;

        if (this._textarea.innerHeight < this._textarea.scrollHeight) {
            this._textarea.style.height = (this._textarea.scrollHeight + offset) + 'px';
        } else {
            this._textarea.style.height = '1px';
            this._textarea.style.height = (this._textarea.scrollHeight + offset) + 'px';
        }
    }

    _focus() {
        if(this._lastRange && this._textarea) {
            this._textarea.focus();

            this._textarea.selectionStart = this._lastRange.start;
            this._textarea.selectionEnd = this._lastRange.end;
        }
    }

    _getContent() {
        return this._textarea.value;
    }

    _onKeyDown() {
        this._resize();
    }

    _onKeyUp() {
        ContentActions.setContent(this._textarea.value);

        this._resize();
    }
}