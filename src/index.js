import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

// import './style/lib.css'
import './style/style.css'


if (document.getElementById('root_wc_drvostep_calc')) {
  ReactDOM.render(
    <App />,
    document.getElementById('root_wc_drvostep_calc')
  )  
}
