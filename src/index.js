import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
