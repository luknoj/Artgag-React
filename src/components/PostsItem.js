import React from 'react';


const PostsItem = (props) => (   
  <div className="grid-x grid-padding-x align-center-middle text-center">
		<div className="cell medium-6">
			<h3>{props.posts.title}</h3>
			<img src={props.posts.content} alt=""/>	
		</div> 
  </div>
);

export default PostsItem;