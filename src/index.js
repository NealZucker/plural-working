import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Navigation from './components/Navigation';
import SearchGiphy from './components/SearchGiphy';
import SearchGifs from './components/SearchGifs';
import ShowGifs from './components/ShowGifs';

ReactDOM.render(
        <Router history={browserHistory}>
          <Route path="/" component={Navigation}>
            <Route path="/library" component={App}/>
            <Route path="/searchgiphy" component={SearchGiphy}/>
            <Route path="/searchgifs" component={SearchGifs}/>
          </Route>
        </Router>
    ,document.getElementById('app'));
