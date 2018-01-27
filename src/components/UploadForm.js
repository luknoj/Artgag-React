import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
        this.setState({ response: result });
      })
    };
  }
  getFile = (e) => {
    this.setState({ file: e.target.files[0] });
  }
  render(){
    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <p className="col-12 h3" >Upload your image</p>
          <form onSubmit={this.uploadFile} >
            <label className="col-12 no-padding" >
              <input className="input-upload-title" type="text" placeholder="Title" onChange={(e) => this.setState({ title: e.target.value })} required/>
            </label>
            <label className="uploadContainer col-12">
              Choose a file to Upload
              <input type="file" onChange={this.getFile} name="image" id=""/>
            </label>
            <button type="submit" className="btn btn-upload col-4" >Upload</button>
          </form>
        </div>
      </div>
    )
}}

export default UploadForm;