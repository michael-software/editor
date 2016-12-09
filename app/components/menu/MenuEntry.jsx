import React from 'react';
import classnames from 'classnames';

import CallbackHelper from '../../utils/CallbackHelper';

import './MenuEntry.scss';

export default class MenuEntry extends React.Component {
    render() {

        let classNames = classnames({
            'menu__entry': true,
            [this.props.classNames]: this.props.classNames
        });

        let classNamesIcon = classnames({
            fa: true,
            [this.props.icon]: this.props.icon,
        });

        let style = {};
        if(this.props.iconSize) {
            style.fontSize = this.props.iconSize
        }

        return(
            <div className={classNames} onClick={this._onClick.bind(this)}>
                <div className="menu__entry__icon">
                    <i className={classNamesIcon} style={style} />
                </div>
                <div className="menu__entry__title">
                    {this.props.children}
                </div>
            </div>
        );
    }

    _onClick() {
        if(this.props.onClick) {
            CallbackHelper.call('content-focus'); // For IE
            this.props.onClick();
        }
    }
}