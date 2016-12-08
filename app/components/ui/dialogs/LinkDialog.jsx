import React from 'react';

import UiActions from '../../../actions/UiActions';
import CallbackHelper from '../../../utils/CallbackHelper';


import AbstractDialog from '../AbstractDialog';

export default class LinkDialog extends React.Component {
    render() {
        return(
            <AbstractDialog onConfirm={this._onConfirm.bind(this)}
                            onAbort={this._onAbort.bind(this)}
                            title="Verknüpfung einfügen">
                <input type="url"
                       ref={(input) => this._inputUrl = input}
                       placeholder="http://"
                       style={{width: '300px'}}
                       onKeyDown={this._onKeyDown.bind(this)} />
            </AbstractDialog>
        );
    }

    componentDidMount() {
        this._inputUrl.focus();
    }

    _onConfirm() {
        let url = this._inputUrl.value;

        window.setTimeout(() => {
            CallbackHelper.call('content-focus');
            document.execCommand('createLink', false, url);
        }, 50);
        console.log(this._inputUrl.value);
    }

    _onAbort() {

    }

    _onKeyDown(event) {
        if(event.keyCode == 13) {
            this._onConfirm();
            UiActions.hideDialogs();
            UiActions.hideOverlay();
        }
    }
}