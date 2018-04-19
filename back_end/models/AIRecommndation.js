var db = require('../connection'); //reference of connection.js  

var AIRecommendation = {  

	getAIRecommndation: function(username, callback) {  
		return db.query("SELECT id FROM users WHERE users.name = ?", [username],  function(err, rows) { 
			console.log("made it ");
			user_id = rows[0].id;
			var spawn = require("child_process").spawn;
			var pythonProcess = spawn('python',["../../recommendation/test.py", user_id]);
			console.log('test1');
			pythonProcess.stdout.on('data', function (data) {
				console.log('test2');
				console.log(data);
				final_shoe = data;
				sleep(100);
			});
			console.log('test3'); 
		});
    }
};  
module.exports = AIRecommendation; 
