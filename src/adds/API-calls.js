import axios from 'axios';

const URL = 'http://localhost:3000';

export default class API {
 
  static async getPosts(){
    return axios.get(`${URL}/api/posts`)
       .then((response) => {
          if(response.data.status)
            return response.data.posts
          else
            return [];
        })
        // .catch(function (error) {
        //   console.log(error);
        // });
  };

  static async getComments(postId){
    return axios.get(`${URL}/api/post/${postId}/comments`)
    .then((response) => {
        return response.data.comments;
    })
  };
  
  static async getPostRating(postId){
    return axios.get(`${URL}/api/post/${postId}/rating`)
    .then((response) => {
        return response.data.rating;
    })
  };

  static async loginUser(login, password){
    return axios.post(`${URL}/api/user/login`, { login,password })
        .then((response) => {
          return response;
        })
  };

  static async postComment(postId, token, content){
    return axios.post(`${URL}/api/post/${postId}`, { content, token })
    .then((response) => {
      return response;
    })
  };

  static async deleteComment(token, commentId, postId){
    return axios.post(`${URL}/api/post/${postId}/${commentId}`, { token })
    .then((response) => { 
       return response;
    })
  };

  static async registerUser(login, email, password){
    return axios.post(`${URL}/api/user/register`, {login, email, password})
    .then((response) => {
      return response;
    })
  };

  static async uploadPost(data){
    return axios.post(`${URL}/api/post/upload`, data)
    .then((response) => { 
      return response;
    })
  };

  static async authenticate(token){
    return axios.post(`${URL}/api/jwtTest`, token)
    .then((response) => {
      return response;
    })
  };
  static async ratePost(token, rate, postId){
    return axios.post(`${URL}/api/post/${postId}/rate`,{token, rate})
    .then((response) => {
      return response;
    })
  };

  static async editPost(token, commentId, newContent){
    return axios.post(`${URL}/api/comment/${commentId}`, {token, commentId, newContent})
    .then((response) => {
      return response;
    })
  };

  static async getRanking(type){
    return axios.get(`${URL}/api/posts/ranking`, type)
    .then((response) => {
      return response.data.rating;
    })
  };

  static async getUserVote(userId, postId){
    return axios.get(`${URL}/api/user/${userId}/${postId}/rating`)
    .then((response) => {
      return response.data.response;
    })
  };

  static async getUserPublicProfile(userId){
    return axios.get(`${URL}/api/user/${userId}`)
    .then((response) => {
      return response.data.user;
    })
  };

  static async getUserPosts(userId){
    return axios.get(`${URL}/api/user/${userId}/posts`)
    .then((response) => {
      return response.data.posts;
    })
  };
}