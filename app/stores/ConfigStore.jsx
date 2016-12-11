import alt from '../alt';

import {createStore} from 'alt-utils/lib/decorators';
import ConfigActions from '../actions/ConfigActions';

import MessageHelper from '../utils/MessageHelper';
import CompatibleIt from '../utils/CompatibleIt';

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

    autosync() {
        this.setState({
            autosync: true
        });
    }

    autoresize() {

        this.setState({
            autoresize: true
        });

        window.document.style.overflow = hidden;

        var element = document.querySelector('.appContainer');
        var height = Math.max( element.scrollHeight, element.offsetHeight );
        var style = CompatibleIt.getStyle(document.body);

        MessageHelper.postMessage({
            action: 'setHeight',
            value: height + parseInt(style.marginTop) + parseInt(style.marginBottom)
        });
    }
}
