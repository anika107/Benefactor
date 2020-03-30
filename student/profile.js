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
    db.execute('SELECT * FROM `student` join location where location.location_id = student.location_id and username = ?',
    [req.session.username]).then(([rows]) =>{
    db.execute('select job_name from student_preference_job1 join job_catagory where job_catagory.job_id = student_preference_job1.job_id and username = ?',
    [req.session.username]).then(([job1]) =>{
    db.execute('select job_name from student_preference_job2 join job_catagory where job_catagory.job_id = student_preference_job2.job_id and username = ?',
    [req.session.username]).then(([job2]) =>{
     db.execute('select job_name from student_preference_job3 join job_catagory where job_catagory.job_id = student_preference_job3.job_id and username = ?',
    [req.session.username]).then(([job3]) =>{
    db.execute('select job_name from student_preference_job4 join job_catagory where job_catagory.job_id = student_preference_job4.job_id and username = ?',
    [req.session.username]).then(([job4]) =>{
    db.execute('SELECT regionname from student_preference_region1 join region where student_preference_region1.region_id = region.region_id and username = ?',
     [req.session.username]).then(([reg1]) =>{
    db.execute('SELECT regionname from student_preference_region2 join region where student_preference_region2.region_id = region.region_id and username = ?',
    [req.session.username]).then(([reg2]) =>{
    db.execute('SELECT regionname from student_preference_region3 join region where student_preference_region3.region_id = region.region_id and username = ?',
    [req.session.username]).then(([reg3]) =>{
    db.execute('SELECT regionname from student_preference_region4 join region where student_preference_region4.region_id = region.region_id and username = ?',
    [req.session.username]).then(([reg4]) =>{
        res.render('student_profile',{
            firstname: rows[0].firstname,
            lastname: rows[0].lastname,
            gender: rows[0].gender,
            dob: rows[0].dob,
            school: rows[0].school,
            college: rows[0].college,
            university: rows[0].university,
            regionname1: reg1[0].regionname,
            regionname2: reg2[0].regionname,
            regionname3: reg3[0].regionname,
            regionname4: reg4[0].regionname,
            streetname: rows[0].streetname,
            streetno: rows[0].streetno,
            city: rows[0].city,
            zip: rows[0].zip,
            job_cata1: job1[0].job_name,
            job_cata2: job2[0].job_name,
            job_cata3: job3[0].job_name,
            job_cata4: job4[0].job_name,
            cv: rows[0].cv,
            email: rows[0].email,
            phone_no: rows[0].phone_no,
            e_salary1: rows[0].e_salary1,
            e_salary2: rows[0].e_salary2
        })
   
    })    
   
    })    
   
    }) 

    })               
            

            
    })
          
            
    })
   
               
    })

            
    })
          
})
})

app.get('/update-student-profile', (req, res)=>{
    res.render('update_profile');
})

app.post('/updated-student-profile', (req,res)=>{
    
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
    
  //  var location_id, streetname, streetno, city, zip;
  //  console.log('start');
   // console.log(req.session.username);
   /* db.execute('select location.location_id from student').then(([r]) =>{
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
       // db.execute("update student set streetname = ? where username = ?",
       // [req.body.streetname,req.session.username ]);
       streetname = req.body.streetname;
       f = 1;
     
       
    }
    if(req.body.streetno){
        //db.execute("update student set streetno = ? where username = ?",
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
                     db.execute("update student set location_id = ? where username = ?",
                     [location_id, req.session.username]);
                 })
                
             }
             else{
                 location_id = row[0].location_id;
                 db.execute("update student set location_id = ? where username = ?",
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
                    db.execute("update student set location_id = ? where username = ?",
                    [loc1.location_id,req.session.username ]);
                 })

            }
            else{
                db.execute("update student set location_id = ? where username = ?",
                [loc.location_id,req.session.username ]);
            }
        })
    }
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
    var reg1, reg2, reg3, reg4;
    if(req.body.region1){
        db.execute('select region_id from region where regionname = ?',[req.body.region1]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into region (regionname) values(?)', [req.body.region1]);
                db.execute('select region_id from region where regionname = ?', [req.body.region1]).then(([reg]) =>{
                    db.execute("update student_preference_region1 set region_id = ? where username = ?",
                     [reg[0].region_id,req.session.username ]);
                })
            }
            else{
                reg1 = row[0].region_id;
                db.execute("update student_preference_region1 set region_id = ? where username = ?",
                     [reg1,req.session.username ]);
                
            }
        })
        
        
    }
    if(req.body.region2){
        db.execute('select region_id from region where regionname = ?',[req.body.region2]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into region (regionname) values(?)', [req.body.region2]);
                db.execute('select region_id from region where regionname = ?', [req.body.region2]).then(([reg]) =>{
                    db.execute("update student_preference_region2 set region_id = ? where username = ?",
                     [reg[0].region_id,req.session.username ]);
                })
            }
            else{
                reg1 = row[0].region_id;
                db.execute("update student_preference_region2 set region_id = ? where username = ?",
                     [reg1,req.session.username]);
                
            }
        })
        
        
    }
    if(req.body.region3){
        db.execute('select region_id from region where regionname = ?',[req.body.region3]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into region (regionname) values(?)', [req.body.region3]);
                db.execute('select region_id from region where regionname = ?', [req.body.region3]).then(([reg]) =>{
                    db.execute("update student_preference_region3 set region_id = ? where username = ?",
                     [reg[0].region_id,req.session.username ]);
                })
            }
            else{
                reg1 = row[0].region_id;
                db.execute("update student_preference_region3 set region_id = ? where username = ?",
                     [reg1,req.session.username]);
                
            }
        })
        
        
    }
    if(req.body.region4){
        db.execute('select region_id from region where regionname = ?',[req.body.region4]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into region (regionname) values(?)', [req.body.region4]);
                db.execute('select region_id from region where regionname = ?', [req.body.region4]).then(([reg]) =>{
                    db.execute("update student_preference_region4 set region_id = ? where username = ?",
                     [reg[0].region_id,req.session.username ]);
                })
            }
            else{
                reg1 = row[0].region_id;
                db.execute("update student_preference_region4 set region_id = ? where username = ?",
                     [reg1,req.session.username ]);
                
            }
        })
        
        
    }
    var job1, job2, job3, job4;
    if(req.body.job_cata1){
        db.execute('select job_id from region where job_catagory = ?',[req.body.job_cata1]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into job_catagory (job_name) values(?)', [req.body.job_cata1]);
                db.execute('select job_id from job_catagory where job_name = ?', [req.body.job_cata1]).then(([reg]) =>{
                    db.execute("update student_preference_job1 set job_id = ? where username = ?",
                     [reg[0].job_id,req.session.username ]);
                })
            }
            else{
                job1 = row[0].job_id;
                db.execute("update student_preference_job1 set job_id = ? where username = ?",
                     [job1,req.session.username ]);
                
            }
        })
    
    }
    if(req.body.job_cata2){
        db.execute('select job_id from region where job_catagory = ?',[req.body.job_cata2]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into job_catagory (job_name) values(?)', [req.body.job_cata2]);
                db.execute('select job_id from job_catagory where job_name = ?', [req.body.job_cata2]).then(([reg]) =>{
                    db.execute("update student_preference_job2 set job_id = ? where username = ?",
                     [reg[0].job_id,req.session.username ]);
                })
            }
            else{
                job2 = row[0].job_id;
                db.execute("update student_preference_job2 set job_id = ? where username = ?",
                     [job2,req.session.username ]);
                
            }
        })
    
    }
    if(req.body.job_cata3){
        db.execute('select job_id from region where job_catagory = ?',[req.body.job_cata3]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into job_catagory (job_name) values(?)', [req.body.job_cata3]);
                db.execute('select job_id from job_catagory where job_name = ?', [req.body.job_cata3]).then(([reg]) =>{
                    db.execute("update student_preference_job3 set job_id = ? where username = ?",
                     [reg[0].job_id,req.session.username ]);
                })
            }
            else{
                job3 = row[0].job_id;
                db.execute("update student_preference_job3 set job_id = ? where username = ?",
                     [job3,req.session.username ]);
                
            }
        })
    
    }
    if(req.body.job_cata4){
        db.execute('select job_id from region where job_catagory = ?',[req.body.job_cata1]).then(([row]) =>{
            if(row.length == 0){
                db.execute('insert into job_catagory (job_name) values(?)', [req.body.job_cata1]);
                db.execute('select job_id from job_catagory where job_name = ?', [req.body.job_cata1]).then(([reg]) =>{
                    db.execute("update student_preference_job4 set job_id = ? where username = ?",
                     [reg[0].job_id,req.session.username ]);
                })
            }
            else{
                job1 = row[0].job_id;
                db.execute("update student_preference_job4 set job_id = ? where username = ?",
                     [job1,req.session.username ]);
                
            }
        })
    
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
    res.redirect('/update-student-profile');
    
})

module.exports = app;