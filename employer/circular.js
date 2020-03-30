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

app.get('/single-job-post', (req, res) =>{
    db.execute('select * from circular join location where circular_id = ? and location.location_id = circular.location_id', [req.session.circular_id]).then(([cir]) =>{
        db.execute('select * from circular_employer join employer where employer_username = username and username = ? and circular_id = ?', [req.session.username, req.session.circular_id]).then(([em]) =>{
            
        })
    })
    
})




module.exports = app;
