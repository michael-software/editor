import React from 'react';
import MenuEntry from '../MenuEntry';

import ContentActions from '../../../actions/ContentActions'

export default class ListEntry extends React.Component {
    render() {

        let icon = 'fa-list-ul';
        let name = 'Unsortierte Liste';
        if(this.props.type == 'ol') {
            icon = 'fa-list-ol';
            name = 'Sortierte Liste';
        }

        return(
            <MenuEntry icon={icon} onClick={this._onClick.bind(this)}>
                {'Liste' || name}
            </MenuEntry>
        );
    }

    _onClick() {
        if(this.props.type == 'ol') {
            document.execCommand('insertOrderedList', false, true);
        } else {
            document.execCommand('insertUnorderedList', false, true);
        }
    }
}