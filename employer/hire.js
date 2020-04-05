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

app.get('/hire-student-circular: circular_id',(req, res)=>{
    username = req.session.username;
    id = req.param.circular_id;

    db.execute('insert into `hire` (`student_username`,`circular_id`) VALUES(?,?)',
    [username,id]);
})




module.exports = app;