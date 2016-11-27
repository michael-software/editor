import React from 'react';

import MenuEntry from '../MenuEntry';
import ContentActions from '../../../actions/ContentActions';

export default class OpenEntry extends React.Component {
    render() {
        return(
            <div>
                <label htmlFor="openEntry__input">
                    <MenuEntry icon="fa-folder-open" onClick={this._onClick.bind()}>
                        Öffnen
                    </MenuEntry>
                </label>
                <input ref={(input) => this._input = input} id="openEntry__input" type="file" style={{display: 'none'}} onChange={this._onFileChange.bind(this)} />
            </div>
        );
    }

    _onClick() {

        //ContentActions.save();
    }

    _onFileChange() {
        if(this._input.files && this._input.files.length > 0) {
            let file = this._input.files[0];

            if(!file.type.match('text.*')) {
                return;
            }

            let reader = new FileReader();

            reader.onload = (event) => {
                ContentActions.load(event.target.result, file.type);
            };

            reader.onerror = (event) => {
                alert('Fehler beim Verarbeiten der Datei');
            };

            reader.readAsText(file, "UTF-8");
        }
    }
}