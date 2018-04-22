var express = require('express');  
var router = express.Router();  
var LocationRecommendation = require('../models/LocationRecommendation');  


router.get('/:id', function(req, res, next) {  
    LocationRecommendation.getLocWeathRecommndation(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(JSON.parse(rows[0]));  
            }  
     });   
});  


module.exports = router; 