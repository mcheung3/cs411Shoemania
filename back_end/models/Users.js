var db = require('../connection'); //reference of connection.js  
var bcrypt = require('bcrypt');


var Users = {  
    getAllUsers: function(callback) {  
        return db.query("Select * from users", callback);  
    },  
    getUserById: function(id, callback) {  
        return db.query("Select * from users where id=?", [id], callback);  
    },
    getUserByName: function(id, callback) {  
        return db.query("Select * from users where users.name=?", [id], callback);  
    },
    addUser: function(User, callback) {  
        return db.query("Insert into users values(?,?,?,?)", [User.id, User.username, User.password, User.location ], callback);  
    },  
    deleteUser: function(id, callback) {  
        return db.query("Delete from users where id=?", [id], callback);  
    },  
    updateUser: function(id, User, callback) {  
        return db.query("Update users set name=?,password=?,location=? where id=?", [User.username, User.password, User.location, id], callback);  
    }  
};  


module.exports = Users; 

