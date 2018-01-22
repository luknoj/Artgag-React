import React, { Component } from 'react';
import API from '../adds/API-calls';
import axios from 'axios';
import CommentList from './CommentList';

class SinglePost extends Component {
  constructor(props){
    super(props);

    this.state = {
      post: {},
      comments: [],
      content: '',
      token: props.data.token,
      message: null,
      isHidden: true
    }
  }
  editPost = () => {
    this.setState({ isHidden: !this.state.isHidden });
  }
  componentDidMount(){
    API.getComments(this.props.routeProps.match.params.id)
    .then((results) => 
    { this.setState({ comments: results }) });
    var post = this.props.data.posts.find( p => p.post_id == this.props.routeProps.match.params.id);
    this.setState({
      post: post,
    });
  }
  deleteComment = (comment_id) => {
    API.deleteComment(this.state.token, comment_id, this.state.post.post_id)
    .then((response) => {
      console.log(response);
      this.props.messageHandler( response.data.message );
      this.setState({ message: response.data.message });
      API.getComments(this.props.routeProps.match.params.id)
        .then((results) => 
        { this.setState({ comments: results }) });
    })
  }
  postComment = (e) => {
    e.preventDefault();
    API.postComment(this.state.post.post_id, this.state.token, this.state.content)
    .then((results) => {
      console.log(results)
      if(results.data.status){
        this.setState({ message: results.data.message });
        API.getComments(this.props.routeProps.match.params.id)
        .then((results) => 
        { this.setState({ comments: results }) });
        // this.setState({ message: response.data.message })
      }else {
        this.setState({ token: null })
      }})
    .catch((error) => {
      console.log(error);
    })
  }
    render(){
      // console.log(this.state.comments);
      // console.log(this.state.post);
     if(this.state.comments){ 
      if(this.state.post){
    return(
      
        <div className="container" >
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 justify-content-center">
              <div className="card post-item">
                <div className="card-header">
                  <h3>{this.state.post.title}</h3>
                </div>
                <div className="card-block">
                  <img src={this.state.post.content} alt={this.state.post.title} />
                </div>
              </div>
                {
                  this.props.data.token ?
                    <div className="" >
                      <form className="form-inline" onSubmit={this.postComment}>
                        <div className="input-group col-8 no-padding-l">
                          <input className="form-control" type="text" onChange={(e) => { this.setState({ content: e.target.value })}} required/>
                        </div>
                        <button className="btn btn-primary col-4" type="submit">Add comment</button>
                      </form>
                    </div> 
                    :
                    <div>
                      <h3 className="text-center" >Please login if you want to comment!</h3>
                    </div>
                }
                {
                  this.state.message != null ?
                    <div>
                      <p className="text-success"><b>{this.state.message}</b></p>
                    </div>
                    :
                    <div>
                      <p className="text-alert"><b>{this.state.message}</b></p>
                    </div>
                }
                <div>
                  <CommentList 
                    postId={this.props.routeProps.match.params.id} 
                  />
                </div>
            </div>  
            <div className="col-2"></div>
          </div>
        </div>
    )}
    else {
        return (
          <h1>This post dosent exist!</h1>
        );
    }
  } else {
    return <h1>Loading...</h1>
  }
}};
export default SinglePost;