var express = require('express');  
var router = express.Router();  
var LocationRecommendation = require('../models/LocationRecommendation');  


router.get('/:id', function(req, res, next) {  
    LocationRecommendation.getLocationRecommendation(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows[Math.floor(Math.random() * rows.length)]);  
            }  
     });   
});  


module.exports = router; 