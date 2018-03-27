var db = require('../connection'); //reference of connection.js  

var Wishlist = {  

    getWishlist: function(id, callback) {  
            return db.query("SELECT id FROM users WHERE users.name = ?", [id],  function(err, rows) { 
                   db.query("SELECT * FROM shoes WHERE shoes.id IN (SELECT shoe_id FROM wishlists WHERE user_id = ?)", [rows[0].id], callback);
     	})
    },
    addItemToWishlist: function(ShoemaniaStats, callback) {  
    	return db.query("SELECT id FROM users WHERE users.name = ?", [ShoemaniaStats.username],  function(err, rows) { 
                db.query("INSERT INTO wishlists values (?,?)", [rows[0].id ,ShoemaniaStats.shoe_id], callback);
     	})
	},
	deleteItemFromWishlist: function(ShoemaniaStats, callback) {  
        console.log(ShoemaniaStats.username)
		return db.query("SELECT id FROM users WHERE users.name = ?", [ShoemaniaStats.username],  function(err, rows) { 
                db.query("DELETE FROM wishlists where wishlists.user_id=? AND wishlists.shoe_id=?", [rows[0].id ,ShoemaniaStats.shoe_id], callback);
     	}) 
    }
};  
module.exports = Wishlist; 
