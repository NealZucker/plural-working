import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';

class HomeGif extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: "",
      password: ""
    };

    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUserLogin(e){
    e.preventDefault();
    this.props.userStore.authenticateUser(this.state.name, this.state.password);
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  render(){
    return(
      <div>
      <form method="" role="form">
        <legend>Search Giphy for Images</legend>

        <div className="form-group">
          <input onChange={this.handleNameChange} value={this.state.name}
          type="text" className="form-control" id="name" placeholder="name"/>
        </div>

        <div className="form-group">
          <input onChange={this.handlePasswordChange} value={this.state.password}
          type="text" className="form-control" id="password" placeholder="password"/>
        </div>

        <button onClick={this.handleUserLogin} type="submit" className="btn btn-primary">Submit</button>

      </form>

      <img src="https://media3.giphy.com/media/26uf4A9dEERcDKXT2/200.webp#12"/>
      </div>
    );
  }
}

HomeGif.propTypes = {
children: React.PropTypes.object,
userStore: React.PropTypes.object
};

export default inject("userStore")(observer(HomeGif));
