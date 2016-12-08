import alt from '../alt';

import {createStore} from 'alt-utils/lib/decorators';
import MenuActions from '../actions/MenuActions';

@createStore(alt)
export default class MenuStore {

    static displayName = 'MenuStore';

    constructor() {
        this.bindActions(MenuActions);

        this.state = {
            content: [],
            active: 0,
            inView: {}
        }
    }

    /**
     * Updates the list of todos in the state.
     * @param todos
     */
    setContent(content) {
        this.setState({
            content: content
        });
    }

    setActive(id) {
        this.setState({
            active: id
        })
    }

    setInView(params) {
        let type = params[0];
        let value = params[1];

        let inView = this.state.inView;
        inView[type] = value;

        this.setState({
            inView: inView
        });
    }

    resetInView() {
        this.setState({
            inView: {}
        });
    }

}
