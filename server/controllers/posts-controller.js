var con = require('../db_connect');
var atob = require('atob');
var blobUtil = require('blob-util');
var AWS = require('aws-sdk');

var AWS_ACCESS_ID_KEY = "";
var AWS_SECRET_ACCESS_KEY = "";

module.exports.uploadPost = function (req, res) {
  var file = req.body.content;
  var buffer = new Buffer(file.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  var bucketName = ''; // project-tas
  AWS.config.update({
    region: 'us-east-2',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: ''
    })
  });
  var params = { 
    Bucket: bucketName,
    // 
    // Body: buffer,
  };
  var data = {
    Key: file.name,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: file.type
  }
  var s3 = new AWS.S3({params});
  s3.putObject(data, function (err, data) {
    var post = {
      "content": 'https://s3.us-east-2.amazonaws.com/' + bucketName +  "/" + file.name,
      "user_id": req.body.user_id,
      "title": req.body.title,
      "post_date": new Date()
    };
    if(err){
      console.log(err);
      res.json({ error: err})
    } else {
      con.query('INSERT INTO articles SET ?', post, function(error, results, fields){
        if (error){
            res.json({
              status: false,
              message: 'There are some errors with query',
              error: error,
            })
          } else {
            res.json({
              status: true,
              data: results,
              message: 'Post added succesfully'
            })
          }
        }) 
    }
  });
}
module.exports.getPosts = function (req,res){
  con.query('SELECT * FROM articles LIMIT 10', function (error,results,fields){
    if(error){
      res.json({
        status: false,
        message: "There are some errors with the query"
        })
    } else {
      res.json({
        posts: results
        })
      } 
 });
};
module.exports.deleteComment = function (req, res) {
  console.log(req.body);
  var comment_id = req.params.commentId;
  con.query('DELETE FROM comments WHERE comment_id=?', [comment_id], function (error, results, fields) {
    if (error) {
      res.json({
        message: 'Cant delete post',
        error,
      })
    } else {
      res.json({
        message: 'Post has been deleted',
        results: results,
      })
    }
  })
}
module.exports.getPostComment = function(req, res){
  var postId = req.params.postId;

  con.query('SELECT * FROM comments WHERE post_id =?', [postId],function (error, results, fields){
    if(error){
      res.json({
        status: 201,
        message: "There are some errors with the query",
        error: error,
      })
    } else {
      res.json({
        comments: results
      })
    }
  });
};
module.exports.sendPostComment = function (req, res) {
  var date = new Date();
  comment = {
    "user_id": req.body.user_id,
    "user_name": req.body.user_name,
    "post_id": req.params.postId,
    "content": req.body.content,
    "date": date,
  }
  
  
  con.query('INSERT INTO comments SET ?', comment, function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some errors with query',
        error,
      })
     } else {
        res.json({
          status: true,
          message: "Your comment has been added"
        })
      }
  });
}