const session = require('express-session');
const express = require('express');

const app = express();

app.use(session({
    secret: 'anonymous',
    resave: true,
    saveUninitialized: true,
   // user: null
 
})); 


module.exports = app;