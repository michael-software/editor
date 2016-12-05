import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';


import MenuStore from '../../stores/MenuStore';


import './MenuContent.scss';

@connectToStores
export default class MenuContent extends React.Component {

    static getStores() {
        return [MenuStore];
    }

    static getPropsFromStores() {
        return assign({},
            MenuStore.getState()
        );
    }

    render() {
        return(
            <div className="menu__content" ref={(div) => this._menuContent = div}>
                <div className="menu__content--container" ref={(div) => this._menuContentContainer = div}>
                    {this.props.content}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._menuContent.addEventListener("mousewheel", (event) => {
            event.preventDefault();

            this._menuContentContainer.scrollLeft += event.deltaY;


            console.log(event);
        }, false);
    }
}