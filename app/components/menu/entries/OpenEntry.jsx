import React from 'react';

import MenuEntry from '../MenuEntry';
import ContentActions from '../../../actions/ContentActions';

import '../../../utils/FileLoader';

export default class OpenEntry extends React.Component {
    render() {
        return(
            <div>
                <label htmlFor="openEntry__input">
                    <MenuEntry icon="fa-folder-open" onClick={this._onClick.bind(this)}>
                        Öffnen
                    </MenuEntry>
                </label>
            </div>
        );
    }

    _onClick() {
        window.fileLoader.show(function(result, type) {
            ContentActions.load(result, type);
        }, function(error) {
            alert('Fehler beim Verarbeiten der Datei');
        });

        //ContentActions.save();
    }

    _onFileChange() {
        // if(this._input.files && this._input.files.length > 0) {
        //     let file = this._input.files[0];
        //
        //     if(!file.type.match('text.*')) {
        //         return;
        //     }
        //
        //     let reader = new FileReader();
        //
        //     reader.onload = (event) => {
        //         ContentActions.load(event.target.result, file.type);
        //     };
        //
        //     reader.onerror = (event) => {
        //         alert('Fehler beim Verarbeiten der Datei');
        //     };
        //
        //     reader.readAsText(file, "UTF-8");
        // }


    }
}