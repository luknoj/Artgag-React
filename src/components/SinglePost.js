import React, { Component } from 'react';
import CommentList from './CommentList';

class SinglePost extends Component {
  constructor(props){
    super(props);

    this.state = {
      post: {},
      content: '',
      token: props.data.token,
      message: null,
    }
  }
  componentDidMount(){
    var post = this.props.data.posts.find( p => String(p.post_id) === String(this.props.routeProps.match.params.id));
    this.setState({
      post: post,
    });
  }
  render(){
  if(this.state.post){
    return(
        <div className="" >
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="card post-item">
                <div className="card-header">
                  <p className="h3">{this.state.post.title}</p>
                </div>
                <div className="card-block">
                  <img src={this.state.post.content} alt={this.state.post.title} />
                </div>
              </div>
                <CommentList postId={this.props.routeProps.match.params.id}/>
            </div>  
          </div>
        </div>
    )}
else {
        return (
          <h1>This post dosent exist!</h1>
        );
    }
}};
export default SinglePost;