var express = require('express');  
var router = express.Router();  
var PersonalRecommendation = require('../models/PersonalRecommendation');  


router.get('/:id', function(req, res, next) {  
    PersonalRecommendation.getPersonalRecommendation(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows[Math.floor(Math.random() * rows.length)]);  
            }  
     });   
});  


module.exports = router; 