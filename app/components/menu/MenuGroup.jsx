import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import classnames from 'classnames';

import MenuStore from '../../stores/MenuStore';
import MenuActions from '../../actions/MenuActions';

import './MenuGroup.scss';


@connectToStores
export default class MenuGroup extends React.Component {

    static getStores() {
        return [MenuStore];
    }

    static getPropsFromStores() {
        return assign({},
            MenuStore.getState()
        );
    }


    render() {

        let classNames = classnames({
            "menu__group": true,
            "menu__group--active": (this.props.active == this.props.id)
        });

        return(
            <div className={classNames} onClick={this._onClick.bind(this)}>
                {this.props.name}
            </div>
        );
    }

    componentDidMount() {
        if(this.props.defaultOpen) {
            window.setTimeout(() => {
                MenuActions.setContent(this.props.children);
                MenuActions.setActive(this.props.id);
            }, 0);
        }
    }

    _onClick() {
        MenuActions.setContent(this.props.children);
        MenuActions.setActive(this.props.id);
    }
}