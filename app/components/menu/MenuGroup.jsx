import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import classnames from 'classnames';

import MenuStore from '../../stores/MenuStore';
import ContentStore from '../../stores/ContentStore';
import MenuActions from '../../actions/MenuActions';

import CallbackHelper from '../../utils/CallbackHelper';

import './MenuGroup.scss';


@connectToStores
export default class MenuGroup extends React.Component {

    static propTypes = {
        type: React.PropTypes.arrayOf(React.PropTypes.string)
    };

    static getStores() {
        return [MenuStore, ContentStore];
    }

    static getPropsFromStores() {
        return assign({},
            MenuStore.getState(),
            ContentStore.getState()
        );
    }


    render() {

        let classNames = classnames({
            "menu__group": true,
            "menu__group--active": (this.props.active == this.props.id)
        });

        if(!this.props.type || this.props.type.indexOf(this.props.mime) > -1)
        return(
            <div className={classNames}>
                <div onClick={this._onClick.bind(this)}>
                    {this.props.name}
                </div>
            </div>
        );

        return null;
    }

    componentDidMount() {
        if(this.props.defaultOpen) {
            CallbackHelper.register('menu-reset', () => {
                this._setActive();
            }, true);

            this._setActive();
        }
    }

    _setActive() {
        window.setTimeout(() => {
            MenuActions.setContent(this.props.children);
            MenuActions.setActive(this.props.id);
        }, 0);
    }

    _onClick() {
        CallbackHelper.call('content-focus');

        MenuActions.setContent(this.props.children);
        MenuActions.setActive(this.props.id);
    }
}