import alt from '../alt';

import {createStore} from 'alt-utils/lib/decorators';
import ContentActions from '../actions/ContentActions';

@createStore(alt)
export default class ContentStore {

    constructor() {
        this.bindActions(ContentActions);

        this.state = {
            content: ""
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

    save() {
        let content = this.state.content.replace(/<wbr>/g, '');
        content = content.replace(/<p>/g, '').replace(/<\/p>/g, '<br />');

        if(window == window.top) {
            console.log('save', content);
        } else {
            let data = JSON.stringify({
                'action': 'save',
                'value': content
            });

            parent.postMessage(data, "*");
        }
    }
}
