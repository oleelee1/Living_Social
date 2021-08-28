var mysql = require('mysql');
var con = require('../SQL/mysql_initiation');

const home_homepage = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/')
    } else {
        console.log('logged in as: '+req.session.userInfo[0].username);
        res.render('home/index');
    };  
};

module.exports = {
    home_homepage
};