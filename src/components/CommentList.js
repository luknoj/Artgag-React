import React, { Component } from 'react';
import API from '../adds/API-calls';
import CommentItem from './CommentItem';

class CommentList extends Component {
  constructor(props){
    super(props);

    this.state = {
      comments: [],
      content: '',
      message: '',
    }
  }
  componentDidMount(){
    API.getComments(this.props.postId)
    .then((results) => 
    { this.setState({ comments: results }) });
  }
  getComments = (postId) => {
    API.getComments(postId)
    .then((results) => 
    { this.setState({ comments: results }) });
  }
  renderComments = () => {
    var comments = this.state.comments.map( (comment) => {
      var transformedDate = (new Date(comment.date)).toLocaleDateString();
      
      return (
        <div key={comment.comment_id} className="card post-item" >
           <CommentItem
            getComments={this.getComments} 
            comment={comment} 
            date={transformedDate}
           />
         </div>
        )
      })
    return comments;
  }
  postComment = (e) => {
    e.preventDefault();
    API.postComment(this.props.postId, localStorage.getItem("token"), this.state.content)
    .then((results) => {
      console.log(results)
      if(results.data.status){
        this.setState({ message: results.data.message });
        this.getComments(this.props.postId);
      } else {
        this.setState({ token: null })
      }})
    .catch((error) => {
      console.log(error);
    })
  }
  render(){
    return(
      <div>
        {
          localStorage.getItem("token") ?
            <div className="gap-bottom-md" >
              <form className="form-inline" onSubmit={this.postComment}>
                <div className="input-group col-8 no-padding-l">
                  <input className="form-control" type="text" onChange={(e) => { this.setState({ content: e.target.value })}} required/>
                </div>
                <button className="btn btn-primary col-4" type="submit">Add comment</button>
              </form>
            </div> 
            :
            <div className="alert alert-info h6" role="alert">
               Please <a href="/login" class="alert-link">login</a> if you want to comment!
            </div>
        }
        {
          this.state.message != null ?
            <div>
              <p className="text-success text-center h3"><b>{this.state.message}</b></p>
            </div>
            :
            <div>
              <p className="text-alert text-center h3"><b>{this.state.message}</b></p>
            </div>
        }
        {this.renderComments()}
      </div>
    )
  }
}

export default CommentList;