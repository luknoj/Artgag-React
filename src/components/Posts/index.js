import React, { Component } from 'react';
import PostsItem from './PostsItem';

class PostsList extends Component {
  renderPostsList = () => {
    var postsList = this.props.data.posts.map((post) => {
    return(
      <div className="row justify-content-center" key={post.post_id}>
        <PostsItem 
          link={this.props.routeProps.match.url}
          userId={this.props.data.userId}
          posts={post} 
        />
      </div>
      )
    })
  return postsList;
  }

  render(){
    return this.renderPostsList()
  }    
}

export default PostsList;