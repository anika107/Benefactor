const express = require('express');
const path = require('path');
const session = require('./session');
const db = require('./database')
const student_register = require('./student/register');
const student_login = require('./student/login');
const student_logout = require('./student/logout');
const student_profile = require('./student/profile');
/*
const employer_register = require('./employer/register');
const employer_login = require('./employer/login');
const employer_logout = require('./employer/logout');
const employer_profile = require('./employer/profile');
*/
const bp = require('body-parser');
const hash = require('password-hash');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(student_login);
app.use(student_logout);
app.use(student_register);
app.use(student_profile);
/*
app.use(employer_login);
app.use(emloyer_logout);
app.use(employer_register);
app.use(employer_profile);
*/
app.use(bp.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session);

app.set('view engine','ejs');
app.use(bp.json());

app.listen(3008, () => console.log("Server is Running..."));