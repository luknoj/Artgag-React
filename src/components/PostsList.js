import React, { Component } from 'react';
import PostsItem from './PostsItem';

import { Link } from 'react-router-dom';

class PostsList extends Component {
    
    renderPostsList = () => {
        var postsList = this.props.data.posts.map((post) => {
            return(
                <div className="row" key={post.post_id}> 
                    <div className="col-2"></div>
                        <PostsItem getComments={this.props.commentHandler} link={this.props.routeProps.match.url} posts={post} />
                    <div className="col-2"></div>
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