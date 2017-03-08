import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {
  render(){
    return(
      <div>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/searchgiphy">Search Giphy Site</Link></li>
          <li><Link to="/searchgifs">Add By URL</Link></li>
          <li><Link to="/library">Library</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

Navigation.propTypes = {
children: React.PropTypes.object
};

export default Navigation;
