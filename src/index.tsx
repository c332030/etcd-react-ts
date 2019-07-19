import './index.css';
import Home from './Home';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Home />
  ,document.getElementById('root')
);

// const Home2: React.FC = () => { return ()};

serviceWorker.unregister();
