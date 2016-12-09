import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import MenuEntry from '../MenuEntry';

import MenuStore from '../../../stores/MenuStore';

@connectToStores
export default class HeadlineEntry extends React.Component {
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
        if(this.props.inView['h' + this.props.size]) classNames += 'active';

        return(
            <MenuEntry classNames={classNames}
                       icon="fa-header"
                       iconSize={`${10*(7-this.props.size || 6)}px`}
                       onClick={this._onClick.bind(this)}>
                Überschrift {this.props.size || 1}
            </MenuEntry>
        );
    }

    _onClick() {
        document.execCommand('formatBlock', false, `<h${this.props.size}>`);
    }
}