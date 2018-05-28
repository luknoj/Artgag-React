import React, { Component } from 'react';
import API from '../adds/API-calls';
import { Link } from 'react-router-dom';

class CommentItem extends Component {
  constructor(props){
    super(props);

    this.state = {
      isHidden: false,
      content: "",
      message: "",
    }
  }
  handleChange = (e) => {
    this.setState({ content: e.target.value })
  }
  editPost = () => {
    API.editPost(localStorage.getItem("token"), this.props.comment.comment_id, this.state.content)
    .then((response) => {
      this.setState({ message: response.data.message });
      // console.log(response.data.message);
    });
    this.props.getComments(this.props.comment.post_id);
  };
  setVisibility = () => {
    this.setState({ isHidden: !this.state.isHidden });
  };
  deleteComment = (comment_id) => {
    API.deleteComment(localStorage.getItem("token"), comment_id, this.props.comment.post_id)
    .then((response) => {
      // console.log(response);
      this.setState({ message: response.data.message });
      this.props.getComments(this.props.comment.post_id);
    })
  };
  render(){
    return(
      <div>
        <div className="card-header comment-header">
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <img className="" src="https://i1.kwejk.pl/k/users/thumbs/default.png"/>
                <div className="flex-column">
                  <p className="text-left" >
                    <Link to={`/user/${this.props.comment.user_id}`}>
                      {this.props.comment.user_name}
                    </Link>
                  </p>
                </div>
              </div>
              <p className="col-6 d-flex align-items-center justify-content-end" >{this.props.date}</p>
            </div>
          </div>
        <div className="card-block comment-content">
          { this.state.isHidden ? 
            <div className="form-group">
              <textarea className="form-control gap-bottom-md" rows="3" value={this.state.comment} onChange={this.handleChange}/>  
              <button 
                className="text-center btn btn-primary full-width" 
                onClick={() => {
                      this.editPost(); 
                      this.props.getComments(this.props.comment.post_id);
                      this.setVisibility(); 
                    }
                  }
              >
                Edit
              </button>
            </div>
            :
            <p>{this.props.comment.content}</p> 
          }    
        </div> 
        { Number(localStorage.getItem("userId")) === Number(this.props.comment.user_id) ?
        <div className="card-footer comment-footer">
          <div className="row">
            <p className="text-left" >
              <button className="icon-comment" onClick={() => this.setVisibility() }>
                <i className="fi-pencil"/>
              </button>
            </p>
            <p className="text-left" >
              <button className="icon-comment" onClick={() => this.deleteComment(this.props.comment.comment_id) }>
                <i className="fi-trash"/>
              </button>
            </p>
          </div>
        </div> 
        :
        ""
        }
      </div>
    )
  }
}

export default CommentItem;    