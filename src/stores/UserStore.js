import { extendObservable } from 'mobx';

export default class UserStore {

  constructor(){
    extendObservable(this, {
        name: '',
        admin: false,
        loggedinuser: false
    });
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  authenticateUser(name, password) {
    // console.log(name + " " + password);
    fetch('/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password
      })
    })
    .then(result => result.json())
    .then( res => {
      if(res.token){
        this.loggedinuser = true;
        this.name = name;
      }else{
        this.loggedinuser = false;
        this.name = "";
      }
    }
      // if(result.token){this.name = name}
    );
  }
}
