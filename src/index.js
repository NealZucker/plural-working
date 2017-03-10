import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Navigation from './components/Navigation';
import SearchGiphy from './components/SearchGiphy';
import SearchGifs from './components/SearchGifs';
import ShowGifs from './components/ShowGifs';
import HomeGif from './components/HomeGif';
import SignUp from './components/SignUp';
import ImageStore from './stores/ImageStore';
import { Provider } from 'mobx-react';

let loggedinuser = {username: 'Ricky', isadmin: true, isloggedin: false};

const imageStore = new ImageStore();

ReactDOM.render(
      <Provider imageStore={imageStore}>
        <Router history={browserHistory}>
          <Route path="/" loggedinuser={loggedinuser} component={Navigation}>
            <IndexRoute component={HomeGif}/>
            <Route path="/library" loggedinuser={loggedinuser} component={App}/>
            <Route path="/searchgiphy" loggedinuser={loggedinuser} component={SearchGiphy}/>
            <Route path="/searchgifs" component={SearchGifs}/>
            <Route path="/signup" component={SignUp}/>
          </Route>
        </Router>
      </Provider>
    ,document.getElementById('app'));
