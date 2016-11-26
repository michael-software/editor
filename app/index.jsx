import React from 'react';
import ReactDOM from 'react-dom';
import 'es6-symbol/implement';

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
            case 'g':
                event.preventDefault();
                alert('ctrl-g');
                break;
        }
    }
}, false);

ReactDOM.render(
    <div className="app">
        <Menu/>
        <Content />
    </div>,
    document.querySelector('.appContainer')
);