import React from 'react';
import {
    Route,
    Link,
    Switch,
    Redirect,
	} from 'react-router-dom';
import PostsList from './PostsList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SinglePost from './SinglePost';
import UploadForm from './UploadForm';

const Nav = (props) => {
  const PrivateRoute = ({ component: Component, authed, fetchPosts, ...rest}) => {
    return (
      <Route
        // {...rest}
        render={(props) => authed !== null ?
        <Component {...props} fetchPosts={fetchPosts} token={authed}/> :
        <Redirect to={{pathname: '/login', state: {from: props.location }}} />
        } 
      />
    )
}
return (
	<div className="content">
		
		{!props.data.posts.length ?
			<h1>Is loading...</h1>
			:
			<div>	
				<nav className="grid-x navigation">
				{/* <div className=""> */}
					<div className="medium-5 nav-logo">
						<span className="nav-logo-art">ART.</span>
						<span className="nav-logo-gag">gag</span>
					</div>
			{props.data.token ?
			
				<ul className="medium-7 nav-bar menu align-right">		
					<li><Link to="/">Hot</Link></li>
					<li><Link to="/upload">Upload post</Link></li>
					<li onClick={props.logoutHandle}><Link to="/">Logout</Link></li> 	
				</ul>
					:
					<ul className="medium-7 nav-bar menu align-right">
						<li><Link to="/">Hot</Link></li>
						<li><Link to="/upload">Upload post</Link></li>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/signup">Signup</Link></li>   
					</ul>
				
			}
				{/* </div> */}
			</nav>		
			<Switch>
				<Route exact path="/" render={ (routeProps) => <PostsList routeProps={routeProps} {...props}/>} />
				<Route path="/login" render={ (routeProps) => <LoginForm {...routeProps} {...props} />}/>
				<Route path="/signup" component={SignupForm} />
				<Route path="/posts/:id" render={(routeProps) => <SinglePost routeProps={routeProps} {...props} />}/>
				<PrivateRoute path="/upload" authed={props.data.token} fetchPosts={props.fetchPosts} component={UploadForm} />
			</Switch>		
		</div>
		}
	</div>
	)			
}

export default Nav;


// const authorizate = (token) => {
// 	return axios.post('http://localhost:8000/api/jwtTest', { token })
// 	.then((response) => {
// 		if(response.data.status){
// 			return response.data.status
// 		} else {
// 			return response.data.status
// 		}
// 	})
// .catch( (error) => {
// 	console.log(error)
// })

// }