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

app.get('/employer-profile', (req, res)=>{
    res.render('employer_profile');
})

app.get('/update-profile', (req, res)=>{
    res.render('update_profile');
})

app.post('/update', (req,res)=>{
    if(req.body.firstname){
        db.execute("update employer set firstname = ? where username = ?",
        [req.body.firstname,req.session.username ]);
    }
    if(req.body.lastname){
        db.execute("update employer set lastname = ? where username = ?",
        [req.body.lastname,req.session.username ]);
    }
    if(req.body.email){
        db.execute("update employer set email = ? where username = ?",
        [req.body.email,req.session.username ]);
    }
    if(req.body.password){
        db.execute("update employer set password = ? where username = ?",
        [req.body.password,req.session.username ]);
    }
    if(req.body.streetname){
        db.execute("update employer set streetname = ? where username = ?",
        [req.body.streetname,req.session.username ]);
    }
    if(req.body.streetno){
        db.execute("update employer set streetno = ? where username = ?",
        [req.body.streetno,req.session.username ]);
    }
    if(req.body.city){
        db.execute("update employer set city = ? where username = ?",
        [req.city.streetname,req.session.username ]);
    }
    if(req.body.zip){
        db.execute("update employer set zip = ? where username = ?",
        [req.body.zip,req.session.username ]);
    }
    if(req.body.website){
        db.execute("update employer set cv = ? where username = ?",
        [req.body.website,req.session.username ]);
    }
    if(req.body.pic){
        db.execute("update employer set pic = ? where username = ?",
        [req.body.pic,req.session.username ]);
    }
    res.redirect('/update-profile');
    
})

module.exports = app;

