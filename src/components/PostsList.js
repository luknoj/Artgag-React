import React, { Component } from 'react';
import PostsItem from './PostsItem';

class PostsList extends Component {
  renderPostsList = () => {
    var postsList = this.props.data.posts.map((post) => {
    return(
      <div className="row justify-content-center" key={post.post_id}>
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
      <div className="">
        {this.renderPostsList()}
      </div>
    )
  }    
}

export default PostsList;