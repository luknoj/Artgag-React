import React, { Component } from 'react';
import API from '../adds/API-calls';
import axios from 'axios';

class SinglePost extends Component {
  constructor(props){
    super(props);

    this.state = {
      post: {},
      comments: [],
      content: '',
      token: props.data.token,
      message: null
    }
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
  renderComments = () => {
    var comments = this.state.comments.map( (comment) => {
      var transformedDate = (new Date(comment.date)).toLocaleDateString();
      
      return (
        <div key={comment.comment_id} className="card" >
            { this.props.data.userId == comment.user_id ?
            <div className="grid-x card-divider">
              <p className="cell medium-6 text-left" >{comment.user_name} ID: {comment.comment_id}</p>
              <p className="cell medium-5 text-right" >{transformedDate}</p>
              <p className="cell medium-1 text-right" >
                <button className="icon-padding" onClick={() => this.deleteComment(comment.comment_id) }>
                  <i className="fi-trash"/>
                </button>
              </p>
            </div>
            :
            <div className="grid-x card-divider">
              <p className="cell medium-6 text-left" >{comment.user_name} ID: {comment.comment_id}</p>
              <p className="cell medium-6 text-right" >{transformedDate}</p>
            </div>
          }
            
          <div className="card-section">
            <p>{comment.content}</p>
          </div>
         </div>  
        )
      })
    return comments;
  }
  
    render(){
      // console.log(this.state.comments);
      // console.log(this.state.post);
     if(this.state.comments){ 
      if(this.state.post){
    return(
      
        <div className="grid-x grid-padding-x align-center-middle text-center" >
          <div className="cell medium-6">
            <h3>{this.state.post.title}</h3>
            <img src={this.state.post.content} alt={this.state.post.title} />
            <div>
              {this.renderComments()}
            </div>
            {this.props.data.token ?
            <div>
              <form onSubmit={this.postComment}>
                <input type="text" onChange={(e) => { this.setState({ content: e.target.value })}} required/>
                <button type="submit">Add comment</button>
              </form>
            </div> 
            :
            <div>
              <h3>Please login if you want to comment!</h3>
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