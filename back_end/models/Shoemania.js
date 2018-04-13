var db = require('../connection'); //reference of connection.js  

var Shoemania = {  

    getShoemania: function(id, callback) {  
        return db.query("SELECT * FROM shoes WHERE shoes.id NOT IN ( SELECT ratedlists.shoe_id FROM ratedlists, users WHERE users.id = ratedlists.user_id AND users.id = ?) ", [id],callback);
    },
    addRated: function(ShoemaniaStats, callback) {  
    	return db.query("SELECT id FROM users WHERE users.name = ?", [ShoemaniaStats.username],  function(err, rows) { 
                db.query("INSERT INTO ratedlists values (?,?,?)", [rows[0].id ,ShoemaniaStats.shoe_id, ShoemaniaStats.liked], callback);
     	})
        //return db.query("INSERT INTO ratedlists (user_id, shoe_id, liked ) values (id, ?, ?) SELECT id FROM users WHERE users.username = ?", [ShoemaniaStats.shoe_id, ShoemaniaStats.liked, ShoemaniaStats.username], callback);  
	}	
};  
module.exports = Shoemania; 
