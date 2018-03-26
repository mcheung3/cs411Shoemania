var express = require('express');  
var router = express.Router();  
var Shoemania = require('../models/Shoemania');  


router.get('/:id?', function(req, res, next) {  

    Shoemania.getShoemania(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows[Math.floor(Math.random() * rows.length)]);  
            }  
     });   
});  

router.post('/', function(req, res, next) {  
    Shoemania.addRated(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  


module.exports = router; 