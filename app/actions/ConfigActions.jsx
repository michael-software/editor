import alt from '../alt';
import {createActions} from 'alt-utils/lib/decorators';

@createActions(alt)
export default class ConfigActions {

    constructor() {
        this.generateActions(
            'update'
        );
    }

}
