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
    return (
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="login col-lg-6 col-md-8 col-sm-12">
            <h1 className="header gap-bottom-md">Account Login</h1>
              <form className="" onSubmit={this.props.loginHandle}>
                <div className="group">
                  <label htmlFor="username" >Login</label>
                  <input id="username" type="text" onChange={this.retriveLogin}/>
                </div>
                <div className="group">
                  <label className="">Password</label>
                  <input className="" type="password"  onChange={this.retrivePassword}/>
                </div>
                {this.props.data.message != null ?
                  <p className="text-alert h6" >{this.props.data.message}</p>
                  :
                  <p></p>
                }
                <button className="btn btn-primary" type="submit">log in</button>
              </form>
          </div>
        </div>
      </div>            
    );
  }
}

export default LoginForm;