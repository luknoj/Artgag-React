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
import RatingList from './RatingList';

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
	<div className="">
		{!props.data.posts.length ?
		<h1>Is loading...</h1>
		:
		<div className="container-fluid">	
			<nav className="row navigation align-items-center">
				<div className="nav-logo">
					<Link to="/">
						<span className="nav-logo-art">ART.</span>
						<span className="nav-logo-gag">gag</span>
					</Link>
				</div>
				<label className="hamburger" htmlFor="nav-toggle"></label>
				<input id="nav-toggle" type="checkbox" className="hidden" />	
				{props.data.token ?
				<ul className="col-12 nav justify-content-end">	
					<li className="nav-item"><Link className="nav-link" to="/">Hot</Link></li>
					<li className="nav-item"><Link className="nav-link" to="/rating">Rating</Link></li>
					<li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
					<li className="nav-item" onClick={props.logoutHandle}><Link className="nav-link" to="/">Logout</Link></li> 	
				</ul>
				:
				<ul className="col-12 nav justify-content-end">
					<li className="nav-item"><Link className="nav-link" to="/">Hot</Link></li>
					<li className="nav-item"><Link className="nav-link" to="/rating">Rating</Link></li>
					<li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
					<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
					<li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>   
				</ul>
				}
			</nav>		
			<Switch>
				<Route exact path="/" render={ (routeProps) => <PostsList routeProps={routeProps} {...props}/>} />
				<Route path="/login" render={ (routeProps) => <LoginForm {...routeProps} {...props} />}/>
				<Route path="/signup" component={SignupForm} />
				<Route path="/rating" render={(routeProps) => <RatingList {...routeProps} {...props} />}/>
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