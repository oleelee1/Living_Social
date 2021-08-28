const express = require('express');
const login_router = express.Router();
const login_controller = require('../controllers/login_controller');

login_router.get('/', login_controller.login_loginpage);
login_router.get('/signup_error', login_controller.login_signuperror);
login_router.get('/checksignupdetails', login_controller.login_checksignupdetails);
login_router.get('/login_error', login_controller.login_loginerror);
login_router.get('/locationEntry', login_controller.login_locationEntry);
login_router.get('/location_error', login_controller.login_locationError);
login_router.get('/checklocationdetails', login_controller.login_checklocationdetails);

login_router.post('/signupdetails', login_controller.login_signupdetails); 
login_router.post('/signup_success', login_controller.login_signupsuccess);
login_router.post('/logindetails', login_controller.login_logindetails);
login_router.post('/locationDetails', login_controller.login_locationDetails);
login_router.post('/locationSuccess', login_controller.login_locationSuccess);

module.exports = login_router;
