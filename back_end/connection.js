var mysql = require('mysql');  
var connection = mysql.createPool({  
        host     : 'shoemaniadbinstance.chnenegb17td.us-east-2.rds.amazonaws.com',
        user     : 'mcheung3',
        password : 'shoemania',
        database : 'shoemania'
});  
module.exports = connection;