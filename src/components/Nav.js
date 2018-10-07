import React from 'react';
import {
    Route,
    Link,
    Switch,
    Redirect,
	} from 'react-router-dom';
import PostsList from './Posts';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SinglePost from './SinglePost';
import UploadForm from './UploadForm';
import RatingList from './RatingList';
import UserProfile from './UserProfile';

const Nav = (props) => {
	const { data: { posts, token }, fetchPosts } = props;
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
	{!posts[0] ?
		<h1>Is loading...</h1>
		:
		<div className="container-fluid">	
			<nav className="row navigation justify-content-center align-items-center">
				<div className="col-xl-8">
					<div className="nav-logo">
						<Link to="/">
							<span className="nav-logo-art">ART.</span>
							<span className="nav-logo-gag">gag</span>
						</Link>
					</div>
					<label className="hamburger" htmlFor="nav-toggle"></label>
					<input id="nav-toggle" type="checkbox" className="hidden" />	
					<ul className="col-12 nav justify-content-end">	
						<li className="nav-item"><Link className="nav-link" to="/">Hot</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/rating">Rating</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>
						{token ?
						<li className="nav-item" onClick={props.logoutHandle}><Link className="nav-link" to="/">Logout</Link></li> 	
						:
						<React.Fragment>
							<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
							<li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>   
						</React.Fragment>
						}
					</ul>
				</div>
			</nav>		
			<Switch>
				<Route exact path="/" render={ (routeProps) => <PostsList routeProps={routeProps} {...props}/>} />
				<Route path="/login" render={ (routeProps) => <LoginForm {...routeProps} {...props} />}/>
				<Route path="/signup" component={SignupForm} />
				<Route path="/rating" render={(routeProps) => <RatingList {...routeProps} {...props} />}/>
				<Route path="/posts/:id" render={(routeProps) => <SinglePost routeProps={routeProps} {...props} />}/>
				<Route path="/user/:id" render={(routeProps) => <UserProfile routeProps={routeProps} {...props} />}/>
				<PrivateRoute path="/upload" authed={token} fetchPosts={fetchPosts} component={UploadForm} />
			</Switch>		
		</div>
		}
	</div>
	)			
}

export default Nav;
