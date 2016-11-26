import React from 'react';

import MenuGroup from './MenuGroup';
import SaveEntry from './entries/SaveEntry';
import MenuContent from './MenuContent';

import './Menu.scss';


export default class Menu extends React.Component {

    render() {
        return(
            <div className="menu">
                <MenuGroup name="Datei" id="file" defaultOpen={true}>
                    <SaveEntry />
                </MenuGroup>


                <MenuContent />
            </div>
        );
    }
}