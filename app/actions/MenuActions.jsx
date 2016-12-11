import alt from '../alt';
import {createActions} from 'alt-utils/lib/decorators';

@createActions(alt)
export default class MenuActions {

    constructor() {
        this.generateActions(
            'setActive',
            'setInView',
            'resetInView'
        );
    }

}
