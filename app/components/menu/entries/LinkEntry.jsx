import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import MenuEntry from '../MenuEntry';

import UiActions from '../../../actions/UiActions';
import UiStore from '../../../stores/UiStore';
import ContentStore from '../../../stores/ContentStore';
import MenuStore from '../../../stores/MenuStore';

@connectToStores
export default class LinkEntry extends React.Component {

    static getStores() {
        return [ContentStore, MenuStore];
    }

    static getPropsFromStores() {
        return assign({},
            ContentStore.getState(),
            MenuStore.getState()
        );
    }

    render() {

        let classNames = '';
        if(this.props.inView['link']) classNames += 'active';

        return(
            <MenuEntry icon="fa-link" classNames={classNames} onClick={this._onClick.bind(this)}>
                Verknüpfung
            </MenuEntry>
        );
    }

    _onClick() {
       UiActions.openDialog(UiStore.LINK_DIALOG, this.props.inView['link']);
    }
}