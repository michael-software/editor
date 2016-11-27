import React from 'react';

import ContentActions from '../../../actions/ContentActions';

import MenuEntry from '../MenuEntry';

export default class NewEntry extends React.Component {
    render() {
        return(
            <div>
                <MenuEntry icon="fa-file-text" onClick={this._onClick.bind()}>
                    Neu
                </MenuEntry>
            </div>
        );
    }

    _onClick() {
        ContentActions.load('', 'text/plain');
    }
}