var db = require('../connection'); //reference of connection.js  

var Shoes = {  
    getAllShoes: function(callback) {  
        return db.query("Select * from shoes", callback);  
    },  
    getShoeById: function(id, callback) {  
        return db.query("Select * from shoes where id=?", [id], callback);  
    },  
    addShoe: function(Shoe, callback) {  
        return db.query("Insert into shoes values(?,?,?,?,?,?,?,?)", [Shoe.Id, Shoe.Brand, Shoe.Photo, Shoe.Description, Shoe.Color, Shoe.Name, Shoe.Type, Shoe.Price ], callback);  
    },  
    deleteShoe: function(id, callback) {  
        return db.query("Delete from shoes where id=?", [id], callback);  
    },  
    updateShoe: function(id, Shoe, callback) {  
        return db.query("Update shoes set brand=?,photo=?,description=?,color=?,name=?,type=?,price=? where id=?", [Shoe.Brand, Shoe.Photo, Shoe.Description, Shoe.Color, Shoe.Name, Shoe.Type, Shoe.Price, id], callback);  
    }  
};  
module.exports = Shoes; 
