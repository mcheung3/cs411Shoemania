var express = require('express');  
var router = express.Router();  
var LocationRecommendation = require('../models/LocationRecommendation');  


router.get('/:id', function(req, res, next) {  
    LocationRecommendation.getLocWeathRecommndation(req.params.id, function(err, rows) {  
            if (err) {  
            	console.log("test2");
                res.json(err);  
            } else {  
            	console.log("test3");
                res.json(rows);  
            }  
     });   
});  


module.exports = router; 