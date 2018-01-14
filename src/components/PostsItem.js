import React from 'react';
import { Link } from 'react-router-dom';

const PostsItem = (props) => (   
  <div className="col-8 justify-content-center">
		<div className="card post-item">
			<Link  to={`/posts/${props.posts.post_id}`}>
				<div className="card-header">
					<h3>{props.posts.title}</h3>
				</div>
			</Link>
			<div className="card-block">
				<Link  to={`/posts/${props.posts.post_id}`}>
					<img src={props.posts.content} alt=""/>	
				</Link>
			</div>
			<div className="card-footer" >
				<div className="row">
					<div className="col-2">
						<button className="icon-padding">
              <i className="fi-arrow-up"/>
            </button>
					</div>
					<div className="col-2">
						<button className="icon-padding">
              <i className="fi-arrow-down"/>
            </button>
					</div>
					<div className="col-8 text-right">
						<p>{(new Date(props.posts.post_date)).toLocaleDateString()}</p>
					</div>
				</div>
			</div>
		</div> 
  </div>
);

export default PostsItem;