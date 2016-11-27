import React from 'react';

import MenuGroup from './MenuGroup';
import MenuContent from './MenuContent';

import NewEntry from './entries/NewEntry';
import SaveEntry from './entries/SaveEntry';
import OpenEntry from './entries/OpenEntry';

import BoldEntry from './entries/BoldEntry';

import './Menu.scss';


export default class Menu extends React.Component {

    render() {
        return(
            <div className="menu">
                <MenuGroup name="Datei" id="file" defaultOpen={true}>
                    <NewEntry />
                    <OpenEntry />
                    <SaveEntry />
                </MenuGroup>
                <MenuGroup name="Format" id="format">
                    <BoldEntry />
                </MenuGroup>


                <MenuContent />
            </div>
        );
    }
}