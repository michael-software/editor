import React from 'react';
import MenuEntry from '../MenuEntry';

import ContentActions from '../../../actions/ContentActions'

export default class ItalicEntry extends React.Component {
    render() {
        return(
            <MenuEntry icon="fa-italic" onClick={this._onClick.bind(this)}>
                Kursiv
            </MenuEntry>
        );
    }

    _onClick() {
       document.execCommand('italic', false, true);
    }
}