import React, { Component } from 'react';
import API from '../adds/API-calls';
import PostsList from './PostsList';

class UserProfile extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      userId: this.props.routeProps.match.params.id,
      profile: [],
      posts: [],
    }
  }
  componentDidMount(){
    API.getUserPosts(this.state.userId)
    .then((response) => {
      this.setState({ posts: response });
    });
    API.getUserPublicProfile(this.state.userId)
    .then((response) => {
      this.setState({ profile: response });
    });
  }
  render(){
    console.log(this.state.posts);
    if(this.state.profile == undefined){
      return <h1>This user dosent exist</h1>
    }
    return(
    <div>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6 col-xl-5 user-profile ">
          <div className="row d-flex align-items-end">
            <img className="" src="https://i1.kwejk.pl/k/users/thumbs/default.png"/>
              <div className="flex-column">
                <p className=" profile-heading font-weight-bold">{this.state.profile.userName}</p>
                {/* <p className="">{(new Date(this.state.outcome.creationDate)).toLocaleDateString('en-GB')}</p> */}
                <p className="text-muted profile-heading-sm">My Activities</p>
              </div>
          </div>
          <div className="row profile-menu">
            <ul className="">  
              <li>Post</li>
              <li>Upvotes</li>
              <li>Comments</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="">
      { this.state.posts ?
        <p>lol</p> 
        :
        <PostsList posts={this.state.posts}/> 
      }
      </div>
    </div>
    )
  }
}

export default UserProfile;