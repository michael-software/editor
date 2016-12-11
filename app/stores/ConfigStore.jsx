import alt from '../alt';

import {createStore} from 'alt-utils/lib/decorators';
import ConfigActions from '../actions/ConfigActions';

@createStore(alt)
export default class ConfigStore {

    static displayName = 'ConfigStore';

    constructor() {
        this.bindActions(ConfigActions);

        this.state = {
            'menu': {
                'files': true
            }
        };
    }

    update(config) {
        this.setState(config);
    }
}
