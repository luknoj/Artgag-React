var con = require('../db_connect');

module.exports.register = function (req,res) {
    var today = new Date();
    var users = {
        "userName": req.body.login,
        "userEmail": req.body.email,
        "userPass": req.body.password,
        "creationDate": today,
    }
    con.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if(error) {
            res.json({
                error: error,
                message: 'There are some errors with query',
            })
        } else {
            res.json({
                message: 'User registered sucessfully'
            })
        }
    });
};