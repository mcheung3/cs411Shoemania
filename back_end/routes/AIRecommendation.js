var express = require('express');  
var router = express.Router();  
var AIRecommendation = require('../models/AIRecommndation');  


router.get('/:id', function(req, res, next) {  
    AIRecommendation.getAIRecommndation(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(JSON.parse(rows[rows.length-1]));  
            }  
     });   
});  


module.exports = router; 