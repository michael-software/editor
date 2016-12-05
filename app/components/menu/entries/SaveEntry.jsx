import React from 'react';
import MenuEntry from '../MenuEntry';

import ContentActions from '../../../actions/ContentActions'

export default class SaveEntry extends React.Component {
    render() {
        return(
            <MenuEntry icon="fa-floppy-o" onClick={this._onClick.bind(this)}>
                Speichern
            </MenuEntry>
        );
    }

    _onClick() {
        ContentActions.save();
    }
}