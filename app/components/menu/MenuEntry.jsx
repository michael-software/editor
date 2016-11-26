import React from 'react';

import './MenuEntry.scss';

export default class MenuEntry extends React.Component {
    render() {
        return(
            <div className="menu__entry" onClick={this._onClick.bind(this)}>
                <div className="menu__entry__icon">
                    <i className="fa fa-floppy-o" />
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