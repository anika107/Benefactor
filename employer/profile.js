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
    db.execute('SELECT * FROM `employer` join location where location.location_id = employer.location_id and username = ?',
    [req.session.username]).then(([rows]) =>{
        res.render('student_profile',{
            firstname = rows[0].firstname,
            lastname = rows[0].lastname,
            pic = rows[0].pic,
            location_id = rows[0].location_id,
            phone_no = rows[0].phone_no,
            companyname = rows[0].companyname,
            website = rows[0].website,
            position = rows[0].position,
            email = rows[0].email
        })
    })
})
   
    
app.get('/update-employer-profile', (req, res)=>{
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
    /*if(req.body.password){
        db.execute("update employer set password = ? where username = ?",
        [req.body.password,req.session.username ]);
    }*/

    
    //  var location_id, streetname, streetno, city, zip;
  //  console.log('start');
   // console.log(req.session.username);
   /* db.execute('select location.location_id from employer').then(([r]) =>{
        console.log(r[0].location_id);
    })*/
    

    
       // console.log(location_id);
   // console.log('outside');
  //  console.log(location_id, streetname);
   
  //  console.log(location_id, streetname,streetno, zip, city);
  /*  db.execute("select streetname, streetno, city, zip from location where location_id = ?", [location_id]).then(([row])=>{
        streetname = row[0].streetname;
        streetno = row[0].streetno;
        city = row[0].city;
        zip = row[0].zip;
    })
   // console.log(location_id, streetname,streetno, zip, city);
    
    var f = 0;
    if(req.body.streetname){
       // db.execute("update employer set streetname = ? where username = ?",
       // [req.body.streetname,req.session.username ]);
       streetname = req.body.streetname;
       f = 1;
     
       
    }
    if(req.body.streetno){
        //db.execute("update employer set streetno = ? where username = ?",
       // [req.body.streetno,req.session.username ]);
       streetno = req.body.streetno;
       f = 1;
   }
   
    if(req.body.city){
        city = req.body.city;
        f = 1;
    }
    if(req.body.zip){
        zip = req.body.zip;
        f = 1;
    }
   // console.log(location_id, streetname,streetno, zip, city);
    if(f == 1){
        db.execute("select location_id from location where (streetno = ? && streetname = ? && city = ? && zip = ?)",
         [streetno, streetname, city, zip]).then(([row]) =>{
             if(row.length == 0){
                 db.execute('insert into `location`(`streetname`,`streetno`,`city`,`zip`) VALUES(?,?,?, ?)', 
                 [streetname, streetno, city, zip])
                // console.log(location_id, streetname,streetno, zip, city);
                 db.execute("select location_id from location where (streetno = ? && streetname = ? && city = ? && zip = ?)",
                 [streetno, streetname, city, zip]).then(([row]) =>{
                     location_id = row[0].location_id;
                     //console.log(location_id);
                     db.execute("update employer set location_id = ? where username = ?",
                     [location_id, req.session.username]);
                 })
                
             }
             else{
                 location_id = row[0].location_id;
                 db.execute("update employer set location_id = ? where username = ?",
                     [location_id, req.session.username]);
             }
         })
    }*/
    if(req.body.streetname && req.body.streetno && req.body.city && req.body.zip){
        db.execute('select * from location where streetname = ? and streetno = ? and city = ? and zip = ?',
        [req.body.streetno, req.body.streetname, req.body.city, req.body.zip]).then(([loc]) =>{
            if(loc.length == 0){
                db.execute('insert into `location`(`streetname`,`streetno`,`city`,`zip`) VALUES(?,?,?, ?)', 
                 [req.body.streetname, req.body.streetno, req.body.city, req.body.zip]);
                 db.execute('select * from location where streetname = ? and streetno = ? and city = ? and zip = ?',
                 [req.body.streetno, req.body.streetname, req.body.city, req.body.zip]).then(([loc1]) =>{
                    db.execute("update employer set location_id = ? where username = ?",
                    [loc1.location_id,req.session.username ]);
                 })

            }
            else{
                db.execute("update employer set location_id = ? where username = ?",
                [loc.location_id,req.session.username ]);
            }
        })
    }
    if(req.body.phone_no){
        db.execute("update employer set phone_no = ? where username = ?",
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

