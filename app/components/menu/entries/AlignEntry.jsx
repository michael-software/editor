import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import MenuEntry from '../MenuEntry';

import MenuStore from '../../../stores/MenuStore';

@connectToStores
export default class AlignEntry extends React.Component {
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
        // if(this.props.inView['h' + this.props.size]) classNames += 'active';
        if(this.props.inView['align-' + (this.props.type || 'left') ]) classNames += 'active';


        let name = 'Links';
        let icon = 'fa-align-left';

        if(this.props.type == "center") {
            name = 'Mittig';
            icon = 'fa-align-center';
        } else if(this.props.type == "right") {
            name = 'Rechts';
            icon = 'fa-align-right';
        } else if(this.props.type == "justify") {
            name = 'Blocksatz';
            icon = 'fa-align-justify';
        }

        return(
            <MenuEntry classNames={classNames}
                       icon={icon}
                       onClick={this._onClick.bind(this)}>
                {name}
            </MenuEntry>
        );
    }

    _onClick() {
        if(this.props.type == "center") {
            document.execCommand('justifyCenter', false, true);
        } else if(this.props.type == "right") {
            document.execCommand('justifyRight', false, true);
        } else if(this.props.type == "justify") {
            document.execCommand('justifyFull', false, true);
        } else {
            document.execCommand('justifyLeft', false, true);
        }
        //document.execCommand('formatBlock', false, `<h${this.props.size}>`);
    }
}