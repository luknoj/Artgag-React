import React, { Component } from 'react';
import PostsItem from './PostsItem';

import { Link } from 'react-router-dom';
import API from '../adds/API-calls';

class PostsList extends Component {
  renderPostsList = () => {
    var postsList = this.props.data.posts.map((post) => {
      // this.getPostRating(post.post_id);
    return(
      <div className="row justify-content-center" key={post.post_id}>

      {/* {console.log(this.state.rating)} */}
        <PostsItem 
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