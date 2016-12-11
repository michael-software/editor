import alt from '../alt';
import {createActions} from 'alt-utils/lib/decorators';

@createActions(alt)
export default class ContentActions {

    constructor() {
        this.generateActions(
            'setContent',
            'save',
            'load',
            'loadUrl',
            'lastSelection',
            'setFocused'
        );
    }

}
