import React from 'react';

import UiActions from '../../actions/UiActions';
import CallbackHelper from '../../utils/CallbackHelper';

import './AbstractDialog.scss';

export default class Dialog extends React.Component {
    static propTypes = {
        children: React.PropTypes.node.isRequired,
        onConfirm: React.PropTypes.func,
        onAbort: React.PropTypes.func,
        show: React.PropTypes.bool
    };

    constructor() {
        super();

        this.state = {
            show: true
        };
    }

    render() {
        return(
            <div className="dialog">
                {this._renderTitle()}
                <div className="dialog__content">
                    {this.props.children}
                </div>
                <div className="dialog__actions">
                    {this._renderActions()}
                </div>
            </div>
        );
    }

    componentDidMount() {
        UiActions.showOverlay();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show) {
            this.setState({
                show: true
            });
        }
    }

    _renderActions() {
        let elements = [];

        if(this.props.onConfirm) {
            elements.push(
                <div className="button" onClick={this._onConfirm.bind(this)} key="ok">
                    OK
                </div>
            );
        }

        if(this.props.onAbort) {
            elements.push(
                <div className="button" onClick={this._onAbort.bind(this)} key="abort">
                    Abbrechen
                </div>
            );
        }

        return elements;
    }

    _renderTitle() {
        if(this.props.title)
            return(
                <h1 className="dialog__title">{this.props.title}</h1>
            );

        return null;
    }

    _onConfirm(event) {

        let confirm = this.props.onConfirm(event);

        if(confirm !== false) {
            UiActions.hideOverlay();
            UiActions.hideDialogs();
        }
    }

    _onAbort(event) {

        let abort = this.props.onAbort(event);

        if(abort !== false) {
            UiActions.hideOverlay();
            UiActions.hideDialogs();
        }
    }
}