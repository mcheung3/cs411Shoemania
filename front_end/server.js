//Establish Connection 
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'shoemaniadbinstance.chnenegb17td.us-east-2.rds.amazonaws.com',
        user     : 'mcheung3',
        password : 'Lightflash9',
        database : 'shoemania',
        charset  : 'utf8'
  }
});

// Get the packages we need
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    Bookshelf = require('bookshelf')(knex);
const passport = require('passport');

