import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import Browser from '../utils/Browser';

import ContentStore from '../stores/ContentStore';
import ContentActions from '../actions/ContentActions';

import './ContentArea.scss';

@connectToStores
export default class ContentArea extends React.Component {

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
                     dangerouslySetInnerHTML={{__html: this.props.content}}>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.content == this._editor.innerHTML) {
            return false;
        }

        return true;
    }

    componentDidMount() {
        this._editor.focus();
    }

    _onKeyDown(event) {
        if (event.keyCode === 13) {
            if(Browser.getBrowser().name != 'ie')
                event.preventDefault();

            if(Browser.isChrome()) {
                document.execCommand('insertHTML', false, '<br><br>');
            } else if(Browser.getBrowser().name == 'edge') {
                document.execCommand('insertHTML', false, "<br><wbr>");
            }
            return false;
        }
    }

    _onKeyUp() {
        ContentActions.setContent(this._editor.innerHTML);
    }
}