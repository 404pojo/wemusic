import React from 'react';
import ReactDOM from 'react-dom';
import "lib-flexible"
import App from './App';
import {Provider} from 'mobx-react'  //react-redux 中也有这个高阶组件
import Store from './store'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider {...new Store()}>
        <App />
    </Provider>,
     document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
