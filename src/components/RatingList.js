import React, { Component } from 'react';
import PostsItem from './PostsItem';
import API from '../adds/API-calls';

class RatingList extends Component {
  constructor(props){
    super(props);

    this.state = { ranking: [] }
  }
  componentDidMount(){
    this.getRating();
  }
  sortByCriteria = (criteria) => {
    switch(criteria){
      case 'rate asc':
        this.setState({ ranking :
          this.state.ranking.sort((a,b) =>{
            return a.rating - b.rating;
          })  
        })
        break;
      case 'rate desc':
        this.setState({ ranking :
          this.state.ranking.sort((a,b) =>{
            return b.rating - a.rating;
          })  
        })
        break;
      default:
        this.setState({ ranking :
          this.state.ranking.sort((a,b) =>{
            return a.rating - b.rating;
          })  
        })
        break;
    }
  }
  renderRatingList = () => {
    var rankingList = this.state.ranking.map((rank) => {
    return(
      <div className="row justify-content-center" key={rank.post_id}>
        <PostsItem 
          link={this.props.match.url} 
          posts={rank} 
        />
      </div>
      )
    })
  return rankingList;
  }
  getRating = () => {
    API.getRanking()
    .then((results) => {
      this.setState({ ranking: results })
    })
  }
  render(){
    return(
      <div className="">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-8 col-sm-12 text-center gap-bottom-md">
            <button className="icon-post sm-margin-r" onClick={() => this.sortByCriteria("rate asc") }>
							<i className="fi-arrow-up"/>
						</button>
						<button className="icon-post sm-margin-r" onClick={() => this.sortByCriteria("rate desc") }>
							<i className="fi-arrow-down"/>
						</button>
          </div>
        </div>
        {this.renderRatingList()}
      </div>
    )
  }    
}

export default RatingList;