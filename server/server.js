var express = require('../node_modules/express');
var bodyParser = require('../node_modules/body-parser');
var cors = require('cors');
var app = express();

app.use(cors());

var loginController = require('./controllers/login-controller');
var registerController = require('./controllers/register-controller');
var postsController = require('./controllers/posts-controller');
var authController = require('./controllers/auth-control');
var userController = require('./controllers/user-controller');

app.use(bodyParser.urlencoded({ limit: "1MB", extended : true }));
app.use(bodyParser.json({ limit: "1MB" }));


app.post('/api/jwtTest', authController.authTest);

app.post('/api/user/register', registerController.register);
app.post('/api/user/login', loginController.login);
app.post('/api/post/upload', authController.auth, postsController.uploadPost);
app.post('/api/post/:postId',authController.auth, postsController.sendPostComment);
app.post('/api/post/:postId/rate', authController.auth, postsController.ratePost);
app.post('/api/post/:postId/:commentId', authController.auth, postsController.deleteComment);
app.post('/api/comment/:commentId', authController.auth, postsController.editComment);


app.get('/api/posts', postsController.getPosts);
app.get('/api/posts/ranking', postsController.getRanking);
app.get('/api/post/:postId/comments', postsController.getPostComment);
app.get('/api/post/:postId/rating', postsController.getPostRating);
app.get('/api/user/:userId/:postId/rating', postsController.checkUserVotes);
app.get('/api/user/:userId/posts', userController.getUserPosts);
app.get('/api/user/:userId/', userController.getPublicProfile);

// app.use(express.static('../src/'));
app.listen(8000, function (err) {
    if(!err){
        console.log("Server running on port 8000")
    } else {
        console.log("Server dosent work");
    }
});