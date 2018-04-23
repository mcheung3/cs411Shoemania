var db = require('../connection'); //reference of connection.js  

var LocationRecommendation = {  
 	getLocWeathRecommndation: function(username, callback) {  
		return db.query("SELECT id FROM users WHERE users.name = ?", [username],  function(err, rows) { 
			user_id = rows[0].id;
			console.log("Test");
			var PythonShell = require('python-shell');
			var options = {
				scriptPath: '../recommendation/',
				args: [user_id]
			};
			PythonShell.run('recommendWeather.py', options, callback);
		});
    }
};  
module.exports = LocationRecommendation; 