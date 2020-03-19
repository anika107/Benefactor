const express = require('express');
const path = require('path');
const session = require('./session');
const db = require('./database')
const student_register = require('./student/register');
const student_login = require('./student/login');
const bp = require('body-parser');
const hash = require('password-hash');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(student_login);
app.use(student_register);
app.use(bp.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session);


app.set('view engine','ejs');
app.use(bp.json());

// APPLY COOKIE SESSION MIDDLEWARE
/*app.use(session({
    secret: 'anonymous',
    resave: true,
    saveUninitialized: true,
    user: null
 
})); */


app.get('/',(req, res)=>{
    if(req.session.user){
       req.session.destroy();
    }
    res.render('home')
})



// LOGOUT
/*app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});*/
// END OF LOGOUT


app.listen(3000, () => console.log("Server is Running..."));