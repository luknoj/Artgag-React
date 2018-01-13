import React, { Component } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import API from '../adds/API-calls';

class SignupForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: 'Login',
            password: 'Password',
            email: 'Email',
        };
    }
    onRegister = (e) => {
        e.preventDefault();
        API.registerUser(this.state.login, this.state.email, this.state.password)        
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.data);
        });
    }
    encryptPassword = (e) => {
        const encryptedPass = CryptoJS.MD5(e.target.value).toString();
        this.setState({ password: encryptedPass });
    }
    render(){
        return (
            <div className="login-form grid-x grid-padding-x align-center-middle text-center">
                <div className="cell medium-6">
                   <h1>Register form</h1>
                   <form onSubmit={this.onRegister}>
                        <label className="text-left">
                            Email
                            <input type="email" placeholder="Email" onChange={e => this.setState({ email: e.target.value})}/>
                        </label>
                        <label className="text-left">
                            Login
                            <input type="text" placeholder="Login" onChange={e => this.setState({ login: e.target.value})}/>
                        </label>
                        <label className="text-left">
                            Password
                            <input type="password" placeholder="Password" onChange={this.encryptPassword}/>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>            
        );
    };
}

export default SignupForm;