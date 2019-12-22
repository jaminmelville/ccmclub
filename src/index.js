import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ReactGa from 'react-ga';
import 'slick-carousel/slick/slick.css';
import './scss/main.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;
require('foundation-sites');

ReactGa.initialize('UA-110451547-1');

function logPageView() {
  ReactGa.set({ page: window.location.pathname + window.location.search });
  ReactGa.pageview(window.location.pathname + window.location.search);
}

logPageView();

ReactDOM.render(
  <Router onUpdate={logPageView}>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
