import React from 'react';
import classnames from 'classnames';

import './MenuEntry.scss';

export default class MenuEntry extends React.Component {
    render() {
        let classNames = classnames({
            fa: true,
            [this.props.icon]: this.props.icon
        });

        let style = {};
        if(this.props.iconSize) {
            style.fontSize = this.props.iconSize
        }

        return(
            <div className="menu__entry" onClick={this._onClick.bind(this)}>
                <div className="menu__entry__icon">
                    <i className={classNames} style={style} />
                </div>
                <div className="menu__entry__title">
                    {this.props.children}
                </div>
            </div>
        );
    }

    _onClick() {
        if(this.props.onClick)
            this.props.onClick();
    }
}