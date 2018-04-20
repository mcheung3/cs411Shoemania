var db = require('../connection'); //reference of connection.js  

var AIRecommendation = {  
/**
	getAIRecommndation: function(username, callback) {  
		return db.query("SELECT id FROM users WHERE users.name = ?", [username],  function(err, rows) { 
			console.log("made it");
			user_id = rows[0].id;
			console.log(user_id)
			var PythonShell = require('python-shell');
			var options = {
				scriptPath: '../recommendation/',
				args: [user_id]
			};
			PythonShell.run('classifier.py', options, function (err, results) {
				if (err) throw err;
				// results is an array consisting of messages collected during execution
				console.log('results: %j', results);
			});
		});
    }
 **/

 	getAIRecommndation: function(username, callback) {  
		return db.query("SELECT id FROM users WHERE users.name = ?", [username],  function(err, rows) { 
			console.log("made it");
			user_id = rows[0].id;
			console.log(user_id)
			var PythonShell = require('python-shell');
			var options = {
				scriptPath: '../recommendation/',
				args: [user_id]
			};
			PythonShell.run('classifier.py', options, callback);
		});
    }
};  
module.exports = AIRecommendation; 
