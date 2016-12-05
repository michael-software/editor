import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import ContentStore from '../stores/ContentStore';
import ContentActions from '../actions/ContentActions';


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
                          onKeyUp={this._onKeyUp.bind(this)} >
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
        this._textarea.focus();
    }

    _onKeyUp() {
        ContentActions.setContent(this._textarea.value);
    }
}