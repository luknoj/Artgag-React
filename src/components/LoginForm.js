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
            <div className="login-form grid-x grid-padding-x align-center-middle text-center">
              <div className="cell medium-6">
                <h1>Login form</h1>
                  <form onSubmit={this.props.loginHandle}>
                    <label className="text-left">
                      Login
                      <input type="text" placeholder="Login" onChange={this.retriveLogin}/>
                       </label>
                       <label className="text-left">
                        Password
                        <input type="password" placeholder="Password" onChange={this.retrivePassword}/>
                       </label> 
                        <button type="submit">Submit</button>
                  </form>
                  {/* {this.props.data.message.length > 0 ?
                    <p className="text-alert" >{this.props.data.message}</p>
                  :
                    <p></p>
                } */}
                </div>
            </div>            
        );
    }
}

export default LoginForm;