import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../adds/API-calls';

class PostsItem extends Component {
	constructor(props){
    super(props);

    this.state = {
      rating: "",
    }
  }
  componentDidMount(){
		this.getPostRating();
	}
	getPostRating = () => {
		API.getPostRating(this.props.posts.post_id)
    .then((response) => {
      this.setState({ rating: response });
    })
	}
	sendRate = (rate, userId) => {
    API.ratePost(localStorage.getItem("token"), rate, userId)
    .then((response) => {
			console.log(response.data.message);
			this.getPostRating();
    })
  } 
	render(){
		return (   
			<div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 justify-content-center">
				<div className="card post-item">					
						<div className="card-header">
							<p className="h3">
								<Link  to={`/posts/${this.props.posts.post_id}`}>
									{this.props.posts.title}
								</Link>
							</p>
						</div>
					<div className="card-block">
						<Link  to={`/posts/${this.props.posts.post_id}`}>
							<img src={this.props.posts.content} alt=""/>	
						</Link>
					</div>
					<div className="card-footer" >
						<div className="row">
							<div className="col-12">
								<p className="text-left">Points: { this.state.rating < 0 || this.state.rating == null ? 0 : this.state.rating }</p>
							</div>
						</div>
						<div className="row align-items-center">
							<div className="col-6">
								<button className="icon-post sm-margin-r" onClick={() => this.sendRate(1, this.props.posts.post_id) }>
									<i className="fi-arrow-up"/>
								</button>
								<button className="icon-post sm-margin-r" onClick={() => this.sendRate(-1, this.props.posts.post_id) }>
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
		)
	}
};

export default PostsItem;