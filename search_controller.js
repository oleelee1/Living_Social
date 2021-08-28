var mysql = require('mysql');
var con = require('../SQL/mysql_initiation');
const fs = require('fs');

const search_everything = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/');
    };
    const localgroupSearch = req.session.userInfo[0].localGroup;
    const usernameSearch = req.session.userInfo[0].username;
    const postcodeSearch = req.session.userInfo[0].postcode.substring(0,5);
    var peopleString = [];
    var allPeople = [];
    var eventString = [];
    var allEvents = [];
    var localgroupString = [];
    var allLocalgroups = [];
    con.query("SELECT firstName, lastName, username, localGroup FROM user_database WHERE (localGroup = '"+localgroupSearch+"' AND username <> '"+usernameSearch+"') ", function (err,result){
        if (err) throw err;
        if (result == ''){
            console.log('No other members in group');
            req.session.peopleSearch = result;
            allPeople = req.session.peopleSearch;
        } else {
            req.session.peopleSearch = result;
            allPeople = req.session.peopleSearch;
        };
        con.query("SELECT eventType, eventDate, eventGuestList, eventProvisions FROM event_database WHERE (localGroup = '"+localgroupSearch+"') ", function (err,result){
            if (err) throw err;
            if (result == ''){
                console.log('No past events from this group');
                req.session.eventSearch = result;
                allEvents = req.session.eventSearch;
            } else {
                req.session.eventSearch = result;
                allEvents = req.session.eventSearch;
                // console.log(allEvents);
            };
            con.query("SELECT groupName, groupMembers FROM group_database WHERE groupPostcode LIKE '"+postcodeSearch+"%'", function (err,result){
                if (err) throw err;
                if (result == ''){
                    console.log('No localgroups from this group');
                    req.session.localgroupSearch = result;
                    allLocalgroups = req.session.localgroupSearch;
                } else {
                    req.session.localgroupSearch = result;
                    allLocalgroups = req.session.localgroupSearch;
                    // console.log(allLocalgroups.length);
                };
            });
        });
    });

    fs.writeFile('./views/partials/searchPartials/searchEverythingPeople.ejs', '', (err) => {
        if (err) throw err;  
        for (var i = 0; i < allPeople.length; i++){
            peopleString[i] = `<li class="list-group-item">`+allPeople[i].username+`</li>
`;
            fs.appendFile('./views/partials/searchPartials/searchEverythingPeople.ejs', peopleString[i], (err) => {
                if (err) throw err;
            });
        };
        fs.writeFile('./views/partials/searchPartials/searchEverythingEvents.ejs', '', (err) => {
            if (err) throw err;                
            for (var i = 0; i < allEvents.length; i++){
                eventString[i] = `<li class="list-group-item">`+allEvents[i].eventType+`</li>
`;
                fs.appendFile('./views/partials/searchPartials/searchEverythingEvents.ejs', eventString[i], (err) => {
                    if (err) throw err;
                });
            };
            fs.writeFile('./views/partials/searchPartials/searchEverythingLocalgroups.ejs', '', (err) => {
                if (err) throw err;                
                for (var i = 0; i < allLocalgroups.length; i++){
                    localgroupString[i] = `<li class="list-group-item">`+allLocalgroups[i].groupName+`</li>
`;
                    fs.appendFile('./views/partials/searchPartials/searchEverythingLocalgroups.ejs', localgroupString[i], (err) => {
                        if (err) throw err;
                    });
                };
            });
        });
    });

    setTimeout(function() {
        res.render('search/everything');
    }, 1000);

};



// const search_everything = (req, res) =>
//     res.render()

const search_people = (req, res) => {
    res.render('search/people');
};

const search_localGroups = (req, res) => {
    res.render('search/localGroups');
};

const search_events = (req, res) => {
    res.render('search/events');
};

module.exports = {
    search_everything,
    search_people,
    search_localGroups,
    search_events,
};