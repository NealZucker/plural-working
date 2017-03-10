import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';
import { observer,inject } from 'mobx-react';

class Navigation extends React.Component {
  render(){
    return(
      <div>
        <h2>Welcome, {this.props.userStore.name}</h2>
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
route: React.PropTypes.object,
userStore: React.PropTypes.object
};

export default inject("userStore")(observer(Navigation));
