const express = require('express');
const path = require('path');
const session = require('../session');
const db = require('../database');
const bp = require('body-parser');
const hash = require('password-hash');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(bp.urlencoded({extended:true}));
app.use(express.static('public'));


app.set('view engine','ejs');
app.use(bp.json());

app.use(session);

app.get('/student-dashboard', (req,res) =>{
  console.log(req.session);
    if(req.session.user){
        res.render('student-dashboard');
    }
    else{
        res.redirect('/');
    }
    
})

app.post('/login',[
    check('username', 'The username field is empty.').not().isEmpty().custom((value) =>{
        return db.execute('select username from student where username = ?', [value]).then(([rows]) =>{
         if(rows.length == 1){
           return true;
        } 
        return Promise.reject('The username does not exists.')
    })     
    check('password', 'The password field is empty').not().isEmpty();
    })
    

    ], (req, res)=>{
        console.log(req.body);
         const result = validationResult(req);
         const username = req.body.username;
         const password = req.body.password;
         console.log(username);
         console.log(password);
         if(result.isEmpty()){
             db.execute('select password from student where username = ?',[username]).then(([rows]) =>{
                 var hash_pass = hash.generate(password);
                 console.log(hash_pass);
                 console.log(rows[0].password);
                 if(hash.verify(password, rows[0].password)){
                     req.session.username = username;
                    
                     req.session.user = "student";
                     res.redirect('/student-dashboard');

                 }
                 else{
                     res.redirect('/student-signin-signup');
                     /*res.render('login-register', {
                         login_error: 'Invalid password'n
                     })*/
                     
                 }
             }) 
         }
         else{
            res.redirect('/student-signin-signup');
         }
        
    }
    
 )

module.exports = app;