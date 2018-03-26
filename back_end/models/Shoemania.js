var db = require('../connection'); //reference of connection.js  

var Shoemania = {  

    getShoemania: function(id, callback) {  
        return db.query("SELECT * FROM shoes WHERE shoes.id NOT IN ( SELECT ratedlists.shoe_id FROM ratedlists, users WHERE users.id = ratedlists.user_id AND users.id = ?) ", [id],callback);
    },
    addRated: function(ShoemaniaStats, callback) {  
        return db.query("Insert into ratedlists values(user_id, shoe_id, liked)", [ShoemaniaStats.user_id, ShoemaniaStats.shoe_id, ShoemaniaStats.liked], callback);  
    }

};  
module.exports = Shoemania; 
