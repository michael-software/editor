import React from 'react';
import MenuEntry from '../MenuEntry';

import ContentActions from '../../../actions/ContentActions'

export default class BoldEntry extends React.Component {
    render() {
        return(
            <MenuEntry icon="fa-bold" onClick={this._onClick.bind()}>
                Fett
            </MenuEntry>
        );
    }

    _onClick() {
       document.execCommand('bold', false, true);
    }
}