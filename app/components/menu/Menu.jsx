import React from 'react';

import MenuGroup from './MenuGroup';
import MenuContent from './MenuContent';

import NewEntry from './entries/NewEntry';
import SaveEntry from './entries/SaveEntry';
import OpenEntry from './entries/OpenEntry';

import BoldEntry from './entries/BoldEntry';
import ItalicEntry from './entries/ItalicEntry';
import UnderlineEntry from './entries/UnderlineEntry';

import HeadlineEntry from './entries/HeadlineEntry';

import ListEntry from './entries/ListEntry';

import LinkEntry from './entries/LinkEntry';

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
                <MenuGroup name="Format" id="format" type={['text/html']}>
                    <BoldEntry />
                    <ItalicEntry />
                    <UnderlineEntry />

                    <HeadlineEntry size={1} />
                    <HeadlineEntry size={2} />
                    <HeadlineEntry size={3} />
                    <HeadlineEntry size={4} />
                    <HeadlineEntry size={5} />

                    <ListEntry type="ul" />
                    <ListEntry type="ol" />

                    <LinkEntry />
                </MenuGroup>


                <MenuContent />
            </div>
        );
    }
}