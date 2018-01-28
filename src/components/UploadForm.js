import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../adds/API-calls';

class UploadForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      file: null,
      message: "",
      status: null,
    }
  }
  componentDidMount(){
    API.authenticate(this.props.token)
    .then((response) => {
      if(!response.data.status){
        <Redirect to='/login'/>
      } else {}
    })
  }
  uploadFile = (e) => {
    e.preventDefault();
    if(this.state.file == null){
      alert("Please input a file");
      return false;
    }
    if(this.state.file.type && this.state.file.type.indexOf('image') !== -1){
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
          console.log(result.data.message);
          this.setState({ 
            message: result.data.message,
            status: result.data.status, 
          });
        })
      };
    } else {
      alert("File you are trying to upload is not an image");
      return false
    }  
  }
  getFile = (e) => {
    this.setState({ file: e.target.files[0] });
  }
  render(){
    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <p className="col-12 h3 gap-bottom-md" >Upload your image</p>
          <form onSubmit={this.uploadFile} >
            <label className="col-12 no-padding" >
              <input className="input-upload-title" type="text" placeholder="Title" onChange={(e) => this.setState({ title: e.target.value })} required/>
            </label>
            <label className="uploadContainer col-12">
              {this.state.file != null ? this.state.file.name : "Choose file to upload"}
              <input type="file" onChange={this.getFile} name="image" id="" />
            </label>
            <button type="submit" className="btn btn-upload col-4" >Upload</button>
            {this.state.status ?
              <p className="text-success h6" >{this.state.message}</p>
              :
              <p className="text-alert h6">{this.state.message}</p>
            }
          </form>
        </div>
      </div>
    )
}}

export default UploadForm;