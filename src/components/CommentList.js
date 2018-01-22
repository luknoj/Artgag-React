import React, { Component } from 'react';
import API from '../adds/API-calls';
import CommentItem from './CommentItem';

class CommentList extends Component {
  constructor(props){
    super(props);

    this.state = {
      comments: [],
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
  
  render(){
    return(
      <div>
        {this.renderComments()}
      </div>
    )
  }
}

export default CommentList;