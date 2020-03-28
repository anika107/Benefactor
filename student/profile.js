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
    res.redirect('/update-profile');
    
})

module.exports = app;

