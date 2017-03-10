import React from 'react';
import { Link } from 'react-router';


class SignUp extends React.Component {
  render(){
    return(
      <div>
        <form method= "post" action="/newUser">
          <legend>Signup</legend>
          <input type="text" name="name" placeholder="name"/>
          <input type="text" name="password" placeholder="password"/>
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
};

export default SignUp;
