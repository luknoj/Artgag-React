import React, { Component } from 'react';
import PostsItem from './PostsItem';

import { Link } from 'react-router-dom';
import API from '../adds/API-calls';

class PostsList extends Component {
  constructor(props){
    super(props);

    this.state = {
      rating: 0
    }
  }
  getPostRating = (postId) => {
   API.getPostRating(postId)
    .then((response) => {
      this.setState({ rating: response });
    })
  }
  sendRate = (rate, userId) => {
    API.ratePost(this.props.data.token, rate, userId)
    .then((response) => {
      console.log(response.data.message);
    })
  } 
  renderPostsList = () => {
    var postsList = this.props.data.posts.map((post) => {
      // this.getPostRating(post.post_id);
    return(
      <div className="row justify-content-center" key={post.post_id}>

      {console.log(this.state.rating)}
        <PostsItem 
          postRating={this.state.rating} 
          sendRate={this.sendRate} 
          getComments={this.props.commentHandler} 
          link={this.props.routeProps.match.url} 
          posts={post} 
        />
      </div>
      )
    })
  return postsList;
  }

  render(){
    return(
      <div className="container">
        {this.renderPostsList()}
      </div>
    )
  }    
}

export default PostsList;