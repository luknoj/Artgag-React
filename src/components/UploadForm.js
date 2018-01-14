import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import API from '../adds/API-calls';

class UploadForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      file: null,
      response: []
    }
  }
  componentDidMount(){
    API.authenticate(this.props.token)
    .then((response) => {
      if(!response.data.status){
        <Redirect to='/login'/>
      }
    })
  }
  uploadFile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    reader.readAsDataURL(this.state.file);

    reader.onload = () => {
      let fileInfo = {
        name: this.state.file.name,
        type: this.state.file.type,
        base64: reader.result,
        // file: this.state.file,
      };
      var data = {
        content: fileInfo,
        title: this.state.title,
        token: this.props.token,
        date: new Date()
      }  
      API.uploadPost(data)
      .then((result) => {
        console.log(result);
        this.setState({ result });
      })
    };
  }
  getFile = (e) => {
    this.setState({ file: e.target.files[0] });
  }
  render(){
   console.log(this.props.token);
    return (
      <div className=" grid-x grid-padding-x align-center-middle text-center">
        <div className="cell medium-6">
          <h3>Upload your image</h3>
          <form onSubmit={this.uploadFile} >
            <label >
              <input type="text" placeholder="Title" onChange={(e) => this.setState({ title: e.target.value })} required/>
            </label>
            <label >
              Choose a file to Upload
              <input type="file" onChange={this.getFile} name="image" id=""/>
            </label>
            <button type="submit" className="upload-btn" >Upload</button>
          </form>
        </div>
      </div>
    )
}}

export default UploadForm;