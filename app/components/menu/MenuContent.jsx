import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';


import MenuStore from '../../stores/MenuStore';


import './MenuContent.scss';

@connectToStores
export default class MenuContent extends React.Component {

    static getStores() {
        return [MenuStore];
    }

    static getPropsFromStores() {
        return assign({},
            MenuStore.getState()
        );
    }

    render() {
        return(
            <div className="menu__content">
                {this.props.content}
            </div>
        );
    }
}