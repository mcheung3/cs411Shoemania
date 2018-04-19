var express = require('express');  
var router = express.Router();  
var Wishlist = require('../models/Wishlist');  


router.get('/:id', function(req, res, next) {  
    Wishlist.getWishlist(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
     });   
});  

router.post('/', function(req, res, next) {  
    Wishlist.addItemToWishlist(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  

router.delete('/', function(req, res, next) { 
    Wishlist.deleteItemFromWishlist(req.query, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body);  
        }  
    });  
});

module.exports = router; 