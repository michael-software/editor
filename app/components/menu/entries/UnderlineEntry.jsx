import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import MenuEntry from '../MenuEntry';

import MenuStore from '../../../stores/MenuStore';

@connectToStores
export default class UnderlineEntry extends React.Component {

    static getStores() {
        return [MenuStore];
    }

    static getPropsFromStores() {
        return assign({},
            MenuStore.getState()
        );
    }

    render() {
        let classNames = '';
        if(this.props.inView['u']) classNames += 'active';

        return(
            <MenuEntry classNames={classNames}
                       icon="fa-underline"
                       onClick={this._onClick.bind(this)}>
                Unterstrichen
            </MenuEntry>
        );
    }

    _onClick() {
       document.execCommand('underline', false, true);
    }
}