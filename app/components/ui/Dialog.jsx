import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import UiStore from '../../stores/UiStore';

import LinkDialog from './dialogs/LinkDialog';

@connectToStores
export default class Dialog extends React.Component {

    static getStores() {
        return [UiStore];
    }

    static getPropsFromStores() {
        return assign({},
            UiStore.getState()
        );
    }

    render() {

        let data = null;
        if(this.props.dialogData) data = this.props.dialogData;

        switch(this.props.dialog) {
            case UiStore.LINK_DIALOG:
                return (<LinkDialog data={data} />);
            default:
                return null;
        }
    }
}