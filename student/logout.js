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
app.get('/logout', (req,res, next) => {
        console.log('destroying session: '+ req.session.user);
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
        
            res.redirect('/');
        }); 
       // req.session.user = null
      // console.log(req.session.user);
      // res.redirect('/'); 
    //}
    
})

module.exports = app;