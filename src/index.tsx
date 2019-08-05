
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import Home from './view/Home';

ReactDOM.render(
  <Home />
  ,document.getElementById('root')
);

// const Home2: React.FC = () => { return ()};

serviceWorker.unregister();
