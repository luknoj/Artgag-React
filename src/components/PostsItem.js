import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../adds/API-calls';

class PostsItem extends Component {
	constructor(props){
    super(props);

    this.state = {
			rating: "",
			userRating: null,
	  }
	}
	componentWillReceiveProps(){
		if(this.props.userId == null)
		this.setState({ userRating: null });
	}
  componentDidMount(){
		this.getPostRating();
	}
	getPostRating = () => {
		if(this.props.userId == ""){
			this.setState({ userRating: null});
		} else {
			API.getUserVote(this.props.userId, this.props.posts.post_id)
			.then((response) => {
				this.setState({ userRating: response });
			});
		}
		API.getPostRating(this.props.posts.post_id)
    .then((response) => {
      this.setState({ rating: response });
		});
	}
	sendRate = (rate, userId) => {
    API.ratePost(localStorage.getItem("token"), rate, userId)
    .then((response) => {
			// console.log(response.data.message);
			this.getPostRating();
    })
  } 
	render(){
		if(this.state.userRating >= -1 ){
		return (   
			<div className="col-xl-4 col-lg-6 col-md-8 col-sm-12 justify-content-center">
				<div className="card post post-item">					
					<div className="card-header post-header">
						<Link  to={`/posts/${this.props.posts.post_id}`}>
							<p className="header h3">			
								{this.props.posts.title}
							</p>
						</Link>
					</div>
					<div className="card-block">
						<Link  to={`/posts/${this.props.posts.post_id}`}>
							<img src={this.props.posts.content} alt=""/>	
						</Link>
					</div>
					<div className="post-footer card-footer" >
						<div className="row">
							<div className="col-12">
								<p className="text-left points">points: { this.state.rating < 0 || this.state.rating == null ? 0 : this.state.rating }</p>
							</div>
						</div>
						<div className="row align-items-center">
							<div className="col-6">
								<button className={"icon sm-margin-r " + (this.state.userRating > 0 ? "icon-positive" : "") } onClick={() => this.sendRate(1, this.props.posts.post_id) }>
									<i className="fi-arrow-up"/>
								</button>
								<button className={"icon sm-margin-r " + (this.state.userRating < 0 ? "icon-negative" : "") } onClick={() => this.sendRate(-1, this.props.posts.post_id) }>
									<i className="fi-arrow-down"/>
								</button>
							</div>
							<div className="col-6 text-right">
								<p>{(new Date(this.props.posts.post_date)).toLocaleDateString()}</p>
							</div>
						</div>
					</div>
				</div> 
			</div>
		)}
	else{
	  return <h1>Is loading...</h1>
	}
	}
};

export default PostsItem;