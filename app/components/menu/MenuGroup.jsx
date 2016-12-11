import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import classnames from 'classnames';

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
        return [ContentStore];
    }

    static getPropsFromStores() {
        return assign({},
            ContentStore.getState()
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps == this.props) {
            return false;
        }

        return true;
    }

    render() {

        let classNames = classnames({
            "menu__group": true,
            "menu__group--active": (this.props.isActive)
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

    // componentDidUpdate() {
    //     if(this.props.defaultOpen) {
    //         console.log('defaultopen');
    //
    //         CallbackHelper.register('menu-reset', () => {
    //             this._setActive();
    //         }, true);
    //
    //         this._setActive();
    //     }
    // }

    _setActive() {
        window.setTimeout(() => {
            MenuActions.setActive(this.props.id);
        }, 0);
    }

    _onClick() {
        CallbackHelper.call('content-focus');

        MenuActions.setActive(this.props.id);
    }
}