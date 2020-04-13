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

app.get('/student-show-applied-list',(req, res) =>{

})

app.get('/student-show-hired-list', (req, res) =>{

})

app.get('/student-show-hired-job:id', (req, res) =>{
    
})

app.get('/apply-job-circular: circular_id',(req, res)=>{
    username = req.session.username;
    id = req.param.circular_id;

    db.execute('insert into `apply` (`student_username`,`circular_id`) VALUES(?,?)',
    [username,id]);
    res.redirect('/student-show-job-post:'+req.param.circular_id);
   
})




module.exports = app;
