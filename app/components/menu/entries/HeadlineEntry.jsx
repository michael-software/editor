import React from 'react';
import MenuEntry from '../MenuEntry';

import ContentActions from '../../../actions/ContentActions'

export default class HeadlineEntry extends React.Component {
    render() {
        return(
            <MenuEntry icon="fa-header" iconSize={`${10*(7-this.props.size || 6)}px`} onClick={this._onClick.bind(this)}>
                Überschrift {this.props.size || 1}
            </MenuEntry>
        );
    }

    _onClick() {
        document.execCommand('formatBlock', false, `<h${this.props.size}>`);
    }
}