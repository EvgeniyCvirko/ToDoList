import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
// @ts-ignore
import {createRoot} from "react-dom/client";
import {HashRouter} from "react-router-dom";

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}>
    <HashRouter>
        <App/>
    </HashRouter>
</Provider>,);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

































