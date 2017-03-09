import React from 'react';
import { Link } from 'react-router';

class HomeGif extends React.Component {
  render(){
    return(
      <div>
      <form method= "post" action="/authenticate">
      <legend>Login</legend>
      <input type="text" name="name" placeholder="name"/>
      <input type="text" name="password" placeholder="password"/>
      <button type="submit"> Submit </button>
    </form>
      <img src="https://media3.giphy.com/media/26uf4A9dEERcDKXT2/200.webp#12"/>
      </div>
    );
  }
}

HomeGif.propTypes = {
children: React.PropTypes.object
};

export default HomeGif;
