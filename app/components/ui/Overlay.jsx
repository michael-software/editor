import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import UiActions from '../../actions/UiActions';
import UiStore from '../../stores/UiStore';
import CallbackHelper from '../../utils/CallbackHelper';

import './Overlay.scss';

@connectToStores
export default class Overlay extends React.Component {

    static getStores() {
        return [UiStore];
    }

    static getPropsFromStores() {
        return assign({},
            UiStore.getState()
        );
    }

    render() {
        if(this.props.showOverlay)
        return(
            <div className="overlay" onClick={this._hideOverlay.bind(this)}>

            </div>
        );

        return null;
    }

    _hideOverlay() {
        UiActions.hideOverlay();
        UiActions.hideDialogs();
    }
}