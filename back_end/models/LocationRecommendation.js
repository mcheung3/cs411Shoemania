var db = require('../connection'); //reference of connection.js  

var LocationRecommendation = {  

	getLocationRecommendation: function(username, callback) {  
		return db.query("SELECT id FROM users WHERE users.name = ?", [username],  function(err, rows) { 
                    db.query("SELECT MAX(count), color FROM ( SELECT COUNT(shoes.color) `count`, shoes.color FROM shoemania.ratedlists, shoemania.shoes WHERE ratedlists.liked AND shoes.id = ratedlists.shoe_id AND ratedlists.user_id = ? GROUP BY shoes.color) `AggregateData`", [rows[0].id], function(err2, rows2) {
                        db.query( "SELECT MAX(count), type FROM ( SELECT COUNT(shoes.type) `count`, shoes.type FROM shoemania.ratedlists, shoemania.shoes WHERE ratedlists.liked AND shoes.id = ratedlists.shoe_id AND ratedlists.user_id = ? GROUP BY shoes.type) `AggregateData`" ,[rows[0].id] , function(err3, rows3) {
                            db.query("SELECT * FROM shoes WHERE shoes.color = ? AND shoes.type = ? AND shoes.id NOT IN ( SELECT shoe_id FROM ratedlists WHERE ratedlists.user_id = ? )", [rows2[0].color, rows3[0].type, rows[0].id ] , callback);
                        });
                    });
     	});
    }
};  
module.exports = LocationRecommendation; 
