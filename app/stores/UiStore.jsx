import alt from '../alt';

import {createStore} from 'alt-utils/lib/decorators';
import UiActions from '../actions/UiActions';

@createStore(alt)
export default class UiStore {

    static displayName = 'UiStore';
    static LINK_DIALOG = 'link_dialog';

    constructor() {
        this.bindActions(UiActions);

        this.state = {
            showOverlay: false,
            dialog: null,
            dialogData: null
        }
    }

    /**
     * Updates the list of todos in the state.
     * @param todos
     */
    showOverlay() {
        this.setState({
            showOverlay: true
        });
    }

    hideOverlay() {
        this.setState({
            showOverlay: false
        });
    }

    openDialog(input) {
        let dialogId = input[0];
        let node = input[1];

        this.setState({
            dialog: dialogId,
            dialogData: node
        });
    }

    hideDialogs() {
        this.setState({
            dialog: null,
            dialogData: null
        })
    }
}
