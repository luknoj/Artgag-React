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
    status: '',
    alert: "",
    };
  }
onRegister = (e) => {
  e.preventDefault();
  API.registerUser(this.state.login, this.state.email, this.state.password)   
  .then((response) => {
    this.setState({ 
      message: response.data.message,
      status:  response.data.status,
    });
  })
  .catch((error) => {
    // console.log(error);
  });
}
encryptPassword = (e) => {
  const encryptedPass = CryptoJS.MD5(e.target.value).toString();
  this.setState({ password: encryptedPass });
}
passwordMatch = (e) => {
  const encryptedPass = CryptoJS.MD5(e.target.value).toString();
  if(this.state.password !== encryptedPass){
    this.setState({ alert: "is-invalid" })
  } else {
    this.setState({ alert: "" })
  }
}
render(){
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="login col-lg-6 col-md-8 col-sm-12">
          <h1 className="header gap-bottom-md">Register account</h1>
          <form onSubmit={this.onRegister}>
            <div className="group">
              <label htmlFor="">Email</label>
              <input id="email" type="email" onChange={e => this.setState({ email: e.target.value})}/>
            </div>
            <div className="group">
              <label htmlFor="login">Login</label>
              <input id="login" type="text"  onChange={e => this.setState({ login: e.target.value})}/>
            </div>
            <div className='group'>
              <label htmlFor="password">Password</label>
              <input id="password" className={this.state.alert} type="password" onChange={this.encryptPassword}/>
            </div>
            <div className='group'>
              <label htmlFor="confirm-password">Confirm password</label>
              <input id="confirm-password" className={this.state.alert} type="password" onChange={this.passwordMatch}/>
            </div>
            {this.state.status ?
              <p className="text-success h6" >{this.state.message}</p>
              :
              <p className="text-alert h6">{this.state.message}</p>
              }
            <button className="btn btn-primary" type="submit">register</button>
          </form>
        </div>
      </div>
    </div>            
    );
  };
}

export default SignupForm;