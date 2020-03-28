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

app.get('/employer-profile', (req, res)=>{
    var firstname, lastname, pic,location_id,phone_no, email, companyname, website, position, streetname, streetno, city, zip;
    db.execute('select firstname, lastname, gender, pic,location_id, phone_no, email, companyname, website, position from employer where username = ?', [req.session.username]).then(([rows]) =>{
        firstname = rows[0].firstname;
        lastname = rows[0].lastname;
        pic = rows[0].pic;
        location_id = rows[0].location_id;
        phone_no = rows[0].phone_no;
        companyname = rows[0].companyname;
        website = rows[0].website;
        position = rows[0].position;
        email = rows[0].email;
        db.execute('select streetname, streetno, city, zip form location where location_id = ?',[location_id]).then(([loc]) =>{
            location = loc[0];
            streetname = location.streetname;
            streetno = locaiton.streetno;
            city = location.city;
            zip = location.zip;
        })

    })

    res.render('student_profile',{
        firstname: firstname,
        lastname: lastname,
        streetname: streetname,
        streetno: streetno,
        city: city,
        zip: zip,
        email: email,
        phone_no: phone_no,
        website: website,
        position: position,
        companyname:companyname
    })

    
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
    /*if(req.body.streetname){
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
    }*/
    if(req.body.phone_no){
        db.execute("update student set phone_no = ? where username = ?",
        [req.body.phone_no,req.session.username ]);
    }
    if(req.body.website){
        db.execute("update employer set cv = ? where username = ?",
        [req.body.website,req.session.username ]);
    }
    if(req.body.pic){
        db.execute("update employer set pic = ? where username = ?",
        [req.body.pic,req.session.username ]);
    }
    if(req.body.companyname){
        db.execute("update employer set companyname = ? where username = ?",
        [req.body.companyname,req.session.username ]);
    }
    if(req.body.position){
        db.execute("update employer set position = ? where username = ?",
        [req.body.position,req.session.username ]);
    }
    res.redirect('/update-profile');
    
})

module.exports = app;

