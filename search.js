const express = require('express');
const path = require('path');
const session = require('./session');
const db = require('./database')
const student_register = require('./student/register');
const student_login = require('./student/login');
const student_logout = require('./student/logout');
const student_profile = require('./student/profile');

const app = express();
app.use(bp.urlencoded({extended:true}));
app.use(express.static('public'));


app.set('view engine','ejs');
app.use(bp.json());

app.use(session);

app.get('/search-location',(req, res)=>{
    db.execute('select * from location where streetname = ? OR city = ?', [req.boby.term, req.boby.term]).then(([loc]) =>{
        for (let index = 0; index < loc.length; index++) {
            db.execute('select * from circular  where location_id = ?',[loc[index].location_id]).then(([cir]) =>{
                res.render('circulars',{
                    circular: cir
                 })
            })
           
       }
           
    })
    
})




module.exports = app;