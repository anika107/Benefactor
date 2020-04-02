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
            db.execute('select * from circular join job_catagory where circular_id = ? and circular.job_id = job_catagory.job_id',[req.session.circular_id]).then(([job]) =>{
                [req.session.username]).then(([rows]) =>{
                    res.render('one_circular',{
                        firstname = em[0].firstname,
                        lastname = em[0].lastname,
                        companyname = em[0].companyname,
                        tag_line = cir[0].tag_line,
                        whatAreYouGoingToDo = cir[0].whatAreYouGoingToDo,
                        whatWeOffer = cir[0].whatAreYouGoingToDo,
                        whatWeAsk = cir[0].whatWeAsk,
                        status = cir[0].status,
                        streetname: cir[0].streetname,
                        streetno: cir[0].streetno,
                        city: cir[0].city,
                        zip: cir[0].zip,
                        workHour = cir[0].workHour,
                        ducation = cir[0].education,
                        salary = cir[0].salary,
                        job_id = job.[0].job_id,
                        publishedAt = cir[0].publishedAt,
                        expiredAt = cir[0].expiredAt
    
                    })
                
            })
             
        })
    })
    
})

app.get('employer-all-post',(req, res)=>{
    db.execute('select * from circular_employer join circular where circular_employer.circular_id = circular.circular_id and employer_usernme = ?' [req.session.employer_username]).then(([cir]) =>{
        db.execute('select * from employer where username = ?' [req.session.username]).then(([emp]) =>{
            res.render('all_circular'{
                circular: cir,
                emp_info: emp
            })
        })
    })
})



module.exports = app;