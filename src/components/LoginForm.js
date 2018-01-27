import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CryptoJS from 'crypto-js';

class LoginForm extends Component {
    retriveLogin = (e) => {
        this.props.loginChange(e.target.value);
    }
    retrivePassword = (e) => {
        const encryptedPass = CryptoJS.MD5(e.target.value).toString();
        this.props.passwordChange(encryptedPass);
    }
    render(){
        const {from} = this.props.location.state || { from: {
            pathname: '/'
        }}
        if(this.props.data.token){
            return <Redirect to={from} />
        }
        console.log(this.props.data.message);
    return (
      <div className="container text-center">
        <h1 className="gap-bottom-md">Login form</h1>
          <form onSubmit={this.props.loginHandle}>
            <div className="form-group row justify-content-center">
              <label className="text-left form-label-md col-1 col-form-label">Login</label>
              <div className="col-3">
                <input className="form-control" type="text" placeholder="Login" onChange={this.retriveLogin}/>
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <label className="text-left form-label-md col-1 col-form-label">Password</label>
              <div className="col-3">
                <input className="form-control" type="password" placeholder="Password" onChange={this.retrivePassword}/>
              </div>
            </div>
            {this.props.data.message != null ?
          <p className="text-alert h6" >{this.props.data.message}</p>
          :
          <p></p>
          }
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
     
      </div>            
    );
  }
}

export default LoginForm;