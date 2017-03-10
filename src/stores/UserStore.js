import { extendObservable } from 'mobx';

export default class UserStore {

  constructor(){
    extendObservable(this, {
      user: {
        name: '',
        password: '',
        admin: false
      }
    });
  }




}
