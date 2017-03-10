import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

let style= {
    liststyletype: 'none'
};

class Navigation extends React.Component {
  render(){
    return(
      <div>
        <h2>Welcome, {this.props.route.loggedinuser.username}</h2>
        <div role="nav" >
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/searchgiphy" >Search Giphy Site</Link></li>
          <li><Link to="/searchgifs" >Add By URL</Link></li>
          <li><Link to="/library" >Library</Link></li>
          <li><Link to="/signup" >Sign Up</Link></li>
        </div>
        {this.props.children}
      </div>
    );
  }
}

Navigation.propTypes = {
children: React.PropTypes.object,
route: React.PropTypes.object
};

export default Navigation;
