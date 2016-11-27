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
            active: 0
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

}
