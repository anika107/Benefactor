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

/*app.use(session({
    secret: 'anonymous',
    resave: true,
    saveUninitialized: true,
   // user: null
 
}));*/ 


app.get('/',(req, res)=>{
    if(req.session.user){
      // req.session.destroy();
      res.redirect('/student-dashboard');
    }
    res.render('home')
})

app.get('/student-signin-signup', (req, res)=>{
    if(req.session.username){
        console.log(req.session.username);
        res.redirect('/student-dashboard');
    }
    else{
        req.session.user = "student";
         console.log(req.session.user);
         res.render('login-register');
    }
})

app.get('/employer', (req, res)=>{
    req.session.user = "employer";
    console.log(req.session.user);
    res.render('login-register');
})




app.post('/register', [
  
    check('user_email', 'The email address is invalid.').isEmail().custom((value) => {
        return db.execute('select email from student where email = ?', [value]).then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('The email address is already exists.')
            }
            return true;
        })
    }),
    check('user_name', 'The username field is empty.').not().isEmpty().custom((value) =>{
        return db.execute('select username from student where username = ?', [value]).then(([rows]) =>{
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
    const errors = validationResult(req);
    console.log(req.body);
    req.session.reg_log = false;

  /* const {user_first, user_last, user_name, user_pass, user_email} = 
        {req.body.first_name, req.body.last_name, req.body.user_name, req.body.user_pass, req.body.user_email};*/
    const user_first = req.body.first_name;
    const user_last = req.body.last_name;
    const user_name = req.body.user_name;
    const user_pass = req.body.user_pass;
    const user_email = req.body.user_email;

    if(errors.isEmpty()){
       // bcrypt.hash(user_pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            req.session.reg_log = true;
            hash_pass = hash.generate(user_pass);
            db.execute("insert into `student`(`username`,`email`,`password`, firstname, lastname) VALUES(?,?,?, ?, ?)",
            [user_name,user_email, hash_pass, user_first, user_last ])
            .then(result => {
                msg = `your account has been created successfully`;
                res.render('login-register', {
                    created: msg
                });
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) throw err;
            });
     //   })
        
    }
    else{

       const result= validationResult(req);
       var err = result.errors;
       console.log(err);
       reg_log = false;
       
      /* for (var key in err) {
           console.log(err[key].msg);
       }*/
     //  console.log(allErrors)
        res.render('login-register',{
            register_error:err,
            old_data:req.body,
            reg_log: reg_log

        });
    }

})
module.exports = app;
