import React from 'react';
import ReactDOM from 'react-dom';
import 'es6-symbol/implement';

import ContentStore from './stores/ContentStore';
import ContentActions from './actions/ContentActions';

import './index.scss';

import Menu from './components/menu/Menu';
import Content from './components/ContentArea';

window.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                event.preventDefault();
                ContentActions.save();
                break;
            case 'f':
                event.preventDefault();
                alert('ctrl-f');
                break;
            case 'o':
                event.preventDefault();

                window.fileLoader.show(function(result, type) {
                    ContentActions.load(result, type);
                }, function(error) {
                    alert('Fehler beim Verarbeiten der Datei');
                });

                break;
            case 'g':
                event.preventDefault();
                alert('ctrl-g');
                break;
        }
    }
}, false);

window.addEventListener("message", (event) => {
    if (event.origin === "http://example.com:8080") // TODO
        return;

    console.log('Event-Data', event.data);

    try {
        let data = JSON.parse(event.data);

        switch(data.action) {
            case 'load':
                ContentActions.load(data.value, data.type || data.mime || 'text/plain');
                break;
            case 'open':
                ContentActions.loadUrl(data.value, data.type || data.mime || 'text/plain');
                break;
            default:
                console.warn('action not found');
                break;
        }
    } catch(ex) {
        console.warn('Error while parsing message', ex);
    }

    console.log('editor', JSON.parse(event.data));
}, false);

ReactDOM.render(
    <div className="app">
        <Menu />
        <Content />
    </div>,
    document.querySelector('.appContainer')
);