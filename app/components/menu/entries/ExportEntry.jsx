import React from 'react';
import MenuEntry from '../MenuEntry';

import ContentActions from '../../../actions/ContentActions'

export default class ExportEntry extends React.Component {
    render() {
        return(
            <MenuEntry icon="fa-file-pdf-o" onClick={this._onClick.bind(this)}>
                PDF exportieren
            </MenuEntry>
        );
    }

    _onClick() {
        ContentActions.export('PDF');
    }
}