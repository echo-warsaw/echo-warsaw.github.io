import React from 'react';
import ReactDOM from 'react-dom';

import Bootstrap from 'bootstrap-without-jquery'; // eslint-disable-line no-unused-vars

import App from './App';

const app =  document.getElementById( 'app' );

ReactDOM.render( ( <App container={app} /> ), app );
