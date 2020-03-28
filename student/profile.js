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

app.get('/student-profile', (req, res)=>{
    res.render('student_profile');
})

app.get('/update-profile', (req, res)=>{
    res.render('update_profile');
})

app.get('/student-profile', (req, res)=>{
    var firstname, lastname,gender, pic,location_id,phone_no,dob,school,college,university,region1, region2, region3, region4,job_cata1,job_cata2,job_cata3,job_cata4,e_salary1,e_salary2, cv, email,
    streetname, streetno, city, zip, job1, job2, job3, job4, regionname1, regionname2, regionname3, regionname4;
    db.execute('select firstname, lastname, gender, pic,location_id, phone_no, dob,school,college,university,region1, region2, region3, region4,job_cata1, job_cata2, job_cata3, job_cata4, e_salary1, e_salary2, cv, email from student where username = ?', [req.session.username]).then(([rows]) =>{
        firstname = rows[0].firstname;
        lastname = rows[0].lastname;
        gender = rows[0].gender;
        pic = rows[0].pic;
        location_id = rows[0].location_id;
        phone_no = rows[0].phone_no;
        dob = rows[0].dob;
        school = rows[0].school;
        college = rows[0].college;
        university = rows[0].university;
        region1 = rows[0].region1;
        region2 = rows[0].region2;
        region3 = rows[0].region3;
        region4 = rows[0].region4;
        job_cata1 = rows[0].job_cata1;
        job_cata2 = rows[0].job_cata2;
        job_cata3 = rows[0].job_cata3;
        job_cata4 = rows[0].job_cata4;
        e_salary1 = rows[0].e_salary1;
        e_salary2 = rows[0].e_salary2;
        cv = rows[0].cv;
        email = rows[0].email;
        db.execute('select streetname, streetno, city, zip form location where location_id = ?',[location_id]).then(([loc]) =>{
            location = loc[0];
            streetname = location.streetname;
            streetno = locaiton.streetno;
            city = location.city;
            zip = location.zip;
        })
        db.execute('select job_name from job_catagory where job_id = ?',[job_cata1]).then(([job])=>{
            job1 = job[0].job_name;
        })
        db.execute('select job_name from job_catagory where job_id = ?',[job_cata2]).then(([job])=>{
            job2 = job[0].job_name;
        })
        db.execute('select job_name from job_catagory where job_id = ?',[job_cata3]).then(([job])=>{
            job3 = job[0].job_name;
        })
        db.execute('select job_name from job_catagory where job_id = ?',[job_cata4]).then(([job])=>{
            job4 = job[0].job_name;
        })

        db.execute('select regionname from region where region_id = ?',[region1]).then(([reg])=>{
            regionname1 = reg[0].regionname;
        })
        db.execute('select regionname from region where region_id = ?',[region2]).then(([reg])=>{
            regionname2 = reg[0].regionname;
        })
        db.execute('select regionname from region where region_id = ?',[region3]).then(([reg])=>{
            regionname3 = reg[0].regionname;
        })
        db.execute('select regionname from region where region_id = ?',[region4]).then(([reg])=>{
            regionname4 = reg[0].regionname;
        })

    })

    res.render('student_profile',{
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        dob: dob,
        school: school,
        college: college,
        university: university,
        regionname1: regionname1,
        regionname2: regionname2,
        regionname3: regionname3,
        regionname4: regionname4,
        streetname: streetname,
        streetno: streetno,
        city: city,
        zip: zip,
        job1: job1,
        job2: job2,
        job3: job3,
        job4: job4,
        cv: cv,
        email: email,
        phone_no: phone_no
    })

    
})


app.post('/update', (req,res)=>{
    if(req.body.firstname){
        db.execute("update student set firstname = ? where username = ?",
        [req.body.firstname,req.session.username ]);
    }
    if(req.body.lastname){
        db.execute("update student set lastname = ? where username = ?",
        [req.body.lastname,req.session.username ]);
    }
    if(req.body.email){
        db.execute("update student set email = ? where username = ?",
        [req.body.email,req.session.username ]);
    }
    if(req.body.password){
        db.execute("update student set password = ? where username = ?",
        [req.body.password,req.session.username ]);
    }
    /*if(req.body.streetname){
        db.execute("update student set streetname = ? where username = ?",
        [req.body.streetname,req.session.username ]);
    }
    if(req.body.streetno){
        db.execute("update student set streetno = ? where username = ?",
        [req.body.streetno,req.session.username ]);
    }
    if(req.body.city){
        db.execute("update student set city = ? where username = ?",
        [req.city.streetname,req.session.username ]);
    }
    if(req.body.zip){
        db.execute("update student set zip = ? where username = ?",
        [req.body.zip,req.session.username ]);
    }*/
    if(req.body.gender){
        db.execute("update student set gender = ? where username = ?",
        [req.body.gender,req.session.username ]);
    }
    if(req.body.phone_no){
        db.execute("update student set phone_no = ? where username = ?",
        [req.body.phone_no,req.session.username ]);
    }
    if(req.body.dob){
        db.execute("update student set dob = ? where username = ?",
        [req.body.dob,req.session.username ]);
    }
    if(req.body.school){
        db.execute("update student set school = ? where username = ?",
        [req.body.school,req.session.username ]);
    }
    if(req.body.college){
        db.execute("update student set college = ? where username = ?",
        [req.body.college,req.session.username ]);
    }
    if(req.body.university){
        db.execute("update student set university = ? where username = ?",
        [req.body.university,req.session.username ]);
    }
    if(req.body.region1){
        db.execute("update student set region1 = ? where username = ?",
        [req.body.region1,req.session.username ]);
    }
    if(req.body.region2){
        db.execute("update student set region2 = ? where username = ?",
        [req.body.region2,req.session.username ]);
    }
    if(req.body.region3){
        db.execute("update student set region3 = ? where username = ?",
        [req.body.region3,req.session.username ]);
    }
    if(req.body.region4){
        db.execute("update student set region4 = ? where username = ?",
        [req.body.region4,req.session.username ]);
    }
    if(req.body.job_cata1){
        db.execute("update student set job_cata1 = ? where username = ?",
        [req.body.job_cata1,req.session.username ]);
    }
    if(req.body.job_cata2){
        db.execute("update student set job_cata2 = ? where username = ?",
        [req.body.job_cata2,req.session.username ]);
    }
    if(req.body.job_cata3){
        db.execute("update student set job_cata3 = ? where username = ?",
        [req.body.job_cata3,req.session.username ]);
    }
    if(req.body.job_cata4){
        db.execute("update student set job_cata4 = ? where username = ?",
        [req.body.job_cata4,req.session.username ]);
    }
    if(req.body.e_salary1){
        db.execute("update student set e_salary1 = ? where username = ?",
        [req.body.e_salary1,req.session.username ]);
    }
    if(req.body.e_salary2){
        db.execute("update student set e_salary2 = ? where username = ?",
        [req.body.e_salary2,req.session.username ]);
    }
    if(req.body.cv){
        db.execute("update student set cv = ? where username = ?",
        [req.body.cv,req.session.username ]);
    }
    if(req.body.pic){
        db.execute("update student set pic = ? where username = ?",
        [req.body.pic,req.session.username ]);
    }
    res.redirect('/update-profile');
    
})

module.exports = app;