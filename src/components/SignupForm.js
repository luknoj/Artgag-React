import React, { Component } from 'react';
import CryptoJS from 'crypto-js';
import API from '../adds/API-calls';

class SignupForm extends Component {
constructor(props){
  super(props);
  
  this.state = {
    login: 'Login',
    password: 'Password',
    email: 'Email',
    message: "",
    };
  }
onRegister = (e) => {
  e.preventDefault();
  API.registerUser(this.state.login, this.state.email, this.state.password)   
  .then((response) => {
    this.setState({ message: response.data.message });
  })
  .catch((error) => {
    console.log(error);
  });
}
encryptPassword = (e) => {
  const encryptedPass = CryptoJS.MD5(e.target.value).toString();
  this.setState({ password: encryptedPass });
}
render(){
  return (
    <div className="container text-center">
      <h1 className="gap-bottom-md">Register form</h1>
      <form onSubmit={this.onRegister}>
        <div className="form-group row justify-content-center">
          <label className="text-left col-form-label  form-label-md col-1">Email</label>
          <div className="col-3">
            <input className="form-control" type="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value})}/>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label className="text-left col-form-label  form-label-md col-1">Login</label>
          <div className="col-3">
            <input className="form-control" type="text" placeholder="Login" onChange={e => this.setState({ login: e.target.value})}/>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <label className="text-left col-form-label form-label-md col-1">Password</label>
          <div className="col-3">
            <input className="form-control" type="password" placeholder="Password" onChange={this.encryptPassword}/>
          </div>
        </div>
        {this.state.message.length > 0 ?
          <p className="text-alert h6" >{this.state.message}</p>
          :
          <p></p>
          }
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>            
    );
  };
}

export default SignupForm;