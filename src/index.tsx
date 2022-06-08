import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {AppWithReducer} from "./AppWithReducer";
import {AppWithRedux} from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
// @ts-ignore
import {createRoot} from "react-dom/client";

/*ReactDOM.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>,
  document.getElementById('root')
);*/
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}>
    <AppWithRedux/>
</Provider>,);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
