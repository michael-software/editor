import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';

import ContentStore from '../../stores/ContentStore';

import HtmlContentArea from './HtmlContentArea';
import PlainContentArea from './PlainContentArea';

@connectToStores
export default class ContentArea extends React.Component {

    static getStores() {
        return [ContentStore];
    }

    static getPropsFromStores() {
        return assign({},
            ContentStore.getState()
        );
    }

    render() {

        if(this.props.mime == "text/plain") {
            return (
                <PlainContentArea />
            );
        } else {
            return (
                <HtmlContentArea />
            );
        }
    }
}