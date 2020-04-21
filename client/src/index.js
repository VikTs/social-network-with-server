import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import { SocialApp } from "./App";
import React from 'react';

ReactDOM.render(<SocialApp/>, document.getElementById('root'));

serviceWorker.unregister();
