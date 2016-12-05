import React from 'react';
import MenuEntry from '../MenuEntry';

import ContentActions from '../../../actions/ContentActions'

export default class UnderlineEntry extends React.Component {
    render() {
        return(
            <MenuEntry icon="fa-underline" onClick={this._onClick.bind(this)}>
                Fett
            </MenuEntry>
        );
    }

    _onClick() {
       document.execCommand('underline', false, true);
    }
}