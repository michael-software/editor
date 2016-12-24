import React from 'react';
import assign from 'object-assign';
import connectToStores from 'alt-utils/lib/connectToStores';
import ConfigStore from '../../stores/ConfigStore';
import MenuStore from '../../stores/MenuStore';
import MenuActions from '../../actions/MenuActions';

import MenuGroup from './MenuGroup';
import MenuContent from './MenuContent';

import NewEntry from './entries/NewEntry';
import SaveEntry from './entries/SaveEntry';
import OpenEntry from './entries/OpenEntry';
import ExportEntry from './entries/ExportEntry';

import BoldEntry from './entries/BoldEntry';
import ItalicEntry from './entries/ItalicEntry';
import UnderlineEntry from './entries/UnderlineEntry';

import HeadlineEntry from './entries/HeadlineEntry';

import ListEntry from './entries/ListEntry';

import LinkEntry from './entries/LinkEntry';

import AlignEntry from './entries/AlignEntry';

import './Menu.scss';

@connectToStores
export default class Menu extends React.Component {

    static getStores() {
        return [ConfigStore, MenuStore];
    }

    static getPropsFromStores() {
        return assign({},
            ConfigStore.getState(),
            MenuStore.getState()
        );
    }

    render() {
        return(
            <div className="menu">

                {this._renderMenuGroups()}

                {this._renderMenuContent()}
            </div>
        );
    }

    _renderMenuGroups() {
        let retval = [];
        let active = this.props.active;
        let defaultOpen = true;


        if(this._isGroupVisible('file')) {
            if(active == null) {
                active = 'file';
            }

            retval.push(
                <MenuGroup name="Datei"
                           key='file'
                           id="file"
                           defaultOpen={defaultOpen}
                           isActive={active == 'file'}/>
            );

            defaultOpen = false;
        } else if(active == 'file') {
            active = null;
        }

        if(this._isGroupVisible('format')) {
            if(active == null) {
                active = 'format';
            }

            retval.push(
                <MenuGroup name="Format"
                           key='format'
                           id="format"
                           type={['text/html']}
                           defaultOpen={defaultOpen}
                           isActive={active == 'format'}/>
            );

            defaultOpen = false;
        }

        if(active != this.props.active) {
            window.setTimeout(() => {
                MenuActions.setActive(active);
            }, 0);
        }

        if(retval.length > 1) return retval;

        return null;
    }

    _renderMenuContent() {
        switch (this.props.active) {
            case 'file':
                if(this._isGroupVisible('file')) return(
                    <MenuContent>
                        <NewEntry />
                        <OpenEntry />
                        <SaveEntry />
                        <ExportEntry />
                    </MenuContent>
                );
            case 'format':
                if(this._isGroupVisible('format')) return(
                    <MenuContent>
                        <BoldEntry />
                        <ItalicEntry />
                        <UnderlineEntry />

                        <HeadlineEntry size={1}/>
                        <HeadlineEntry size={2}/>
                        <HeadlineEntry size={3}/>
                        <HeadlineEntry size={4}/>
                        <HeadlineEntry size={5}/>

                        <ListEntry type="ul"/>
                        <ListEntry type="ol"/>

                        <LinkEntry />

                        <AlignEntry />
                        <AlignEntry type="center"/>
                        <AlignEntry type="right"/>
                        <AlignEntry type="justify"/>
                    </MenuContent>
                );

                if(this._isGroupVisible(type))
                    break;
            default:
                return null;
        }
    }

    _isGroupVisible(type) {
        return !this.props.menu || this.props.menu[type] == null || this.props.menu[type] == true;
    }
}