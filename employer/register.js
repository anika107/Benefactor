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


app.get('/',(req, res)=>{   
     if(req.session.username){ 
        res.redirect('/employer-dashboard');

    }
    else{ 
        res.render('home');
    }  
})

app.get('/employer-signin-signup', (req, res)=>{
    if(req.session.username){
       // console.log(req.session.username);
        res.redirect('/employer-dashboard');
    }
    else{
        req.session.user = "employer";
        // console.log(req.session.user);
         res.render('login-register');
    }
})

app.get('/student', (req, res)=>{
    req.session.user = "student";
    console.log(req.session.user);
    res.render('login-register');
})




app.post('/register', [
  
    check('user_email', 'The email address is invalid.').isEmail().custom((value) => {
        return db.execute('select email from employer where email = ?', [value]).then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('The email address is already exists.')
            }
            return true;
        })
    }),
    check('user_name', 'The username field is empty.').not().isEmpty().custom((value) =>{
        return db.execute('select username from employer where username = ?', [value]).then(([rows]) =>{
            if(rows.length > 0){
                return Promise.reject('The username is already exists.')
            }
            return true;
        })
    }), 
    check('first_name', 'The firstname field is empty.').not().isEmpty(),
    check('last_name', 'The lastname field is empty.').not().isEmpty(),
    check('user_pass', 'The Minimum length of password is five.').isLength({min:5})

], (req, res)=>{
    const error = validationResult(req);
    console.log(req.body);

    const user_first = req.body.first_name;
    const user_last = req.body.last_name;
    const user_name = req.body.user_name;
    const user_pass = req.body.user_pass;
    const user_email = req.body.user_email;

    if(error.isEmpty()){
            hash_pass = hash.generate(user_pass);
            db.execute("insert into `employer`(`username`,`email`,`firstname`,`lastname`,`companyname`,`password`) VALUES(?,?,?, ?, ?)",
            [user_name,user_email, user_first, user_last,company_name, hash_pass,])
            .then(result => {
                msg = `your account has been created successfully`;
                res.render('login-register', {
                    created: msg
                });
            }).catch(err => {
                if (err) throw err;
            });
        
    }
    else{
       var err = error.errors;
     //  console.log(err);
  
      /* for (var key in err) {
           console.log(err[key].msg);
       }*/
        res.render('login-register',{
            register_error:err,

        });
    }

})
module.exports = app;
