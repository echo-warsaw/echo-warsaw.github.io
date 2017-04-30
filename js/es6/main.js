import React from 'react';
import ReactDOM from 'react-dom';

import Bootstrap from 'bootstrap-without-jquery'; // eslint-disable-line no-unused-vars

import App from './App';

const app = document.getElementById('app');

ReactDOM.render(( <App container={app}/> ), app);

// FACEBOOK STUFF
import {$FB_APP_ID} from './constants';

window.fbAsyncInit = function () {
    FB.init({
        appId: $FB_APP_ID,
        xfbml: true,
        version: 'v2.9'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
