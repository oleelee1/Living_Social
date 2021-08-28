var mysql = require('mysql');
var con = require('../SQL/mysql_initiation');
const fs = require('fs');
const { result } = require('lodash');
const { Calendar } = require("node-calendar-js");

var EventTypeLog = '';

const createEvent_createEventMainGet = (req,res) => {
    res.render('createEvent/createEvent_main');
};

const createEvent_createEventIndexGet = (req,res) => {
    res.redirect('/index');
};

const createEvent_createEventMain = (req,res) => {
    res.render('createEvent/createEvent_main');
};

const createEvent_createEventType = (req,res) => {
    res.render('createEvent/createEvent_type');  
};

const createEvent_createEventDate = (req,res) => {
    var d = new Date();
    var D = d.getDate();
    var WD = d.getDay();
    var Y = d.getFullYear();
    var M = d.getMonth();

    const calendar = new Calendar({
        year: Y,
        month: M
    });
    
    console.log(calendar.create());
    const calendarObj = calendar.create();
    console.log(calendarObj.days.length);
    // console.log(calendar.toHTML());
    fs.writeFileSync('./views/partials/createEventPartials/calendarHTML.ejs','');
    captionHTML = `<caption>`+calendar.monthName+` `+calendar.year+`</caption>`;
    var row0HTML = [];
    var row1HTML = [];
    var row2HTML = [];
    var row3HTML = [];
    var row4HTML = [];
    var row0index = 0;
    var row1index = 0;
    var row2index = 0;
    var row3index = 0;
    var row4index = 0;

    console.log('calendar day'+calendar.days[1]);

    for(var i = 0; i < calendarObj.days.length; i++){
        if(calendarObj.days[i].row == 0 && !calendarObj.days[i].holiday){
            row0HTML[row0index] =  `<td class="day">`+calendarObj.days[i].day+`</td>`;
            row0index++;
        } else if(calendarObj.days[i].row == 0 && calendarObj.days[i].holiday) {
            row0HTML[row0index] =  `<td class="day holiday">`+calendarObj.days[i].day+`</td>`;
            row0index++;
        };
            
        if(calendarObj.days[i].row == 1 && !calendarObj.days[i].holiday){
            row1HTML[row1index] =  `<td class="day">`+calendarObj.days[i].day+`</td>`;
            row1index++;
        } else if(calendarObj.days[i].row == 1 && calendarObj.days[i].holiday) {
            row1HTML[row1index] =  `<td class="day holiday">`+calendarObj.days[i].day+`</td>`;
            row1index++;
        };

        if(calendarObj.days[i].row == 2 && !calendarObj.days[i].holiday){
            row2HTML[row2index] =  `<td class="day">`+calendarObj.days[i].day+`</td>`;
            row2index++;
        } else if(calendarObj.days[i].row == 2 && calendarObj.days[i].holiday) {
            row2HTML[row2index] =  `<td class="day holiday">`+calendarObj.days[i].day+`</td>`;
            row2index++;
        };

        if(calendarObj.days[i].row == 3 && !calendarObj.days[i].holiday){
            row3HTML[row3index] =  `<td class="day">`+calendarObj.days[i].day+`</td>`;
            row3index++;
        } else if(calendarObj.days[i].row == 3 && calendarObj.days[i].holiday) {
            row3HTML[row3index] =  `<td class="day holiday">`+calendarObj.days[i].day+`</td>`;
            row3index++;
        };

        if(calendarObj.days[i].row == 4 && !calendarObj.days[i].holiday){
            row4HTML[row4index] =  `<td class="day">`+calendarObj.days[i].day+`</td>`;
            row4index++;
        } else if(calendarObj.days[i].row == 4 && calendarObj.days[i].holiday) {
            row4HTML[row4index] =  `<td class="day holiday">`+calendarObj.days[i].day+`</td>`;
            row4index++;
        };
    };
    row0HTML = row0HTML.join(' ');
    row1HTML = row1HTML.join(' ');
    row2HTML = row2HTML.join(' ');
    row3HTML = row3HTML.join(' ');
    row4HTML = row4HTML.join(' ');
    
    const calendarHTML = `
<table width="100%">
    `+captionHTML+`
    <thead>
        <tr>
            <th class="sunday">Sunday</th>
            <th class="monday">Monday</th>
            <th class="tuesday">Tuesday</th>
            <th class="wednesday">Wednesday</th>
            <th class="thursday">Thursday</th>
            <th class="friday">Friday</th>
            <th class="saturday">Saturday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            `+row0HTML+`
        </tr>
        <tr>
            `+row1HTML+`
        </tr>
        <tr>
            `+row2HTML+`
        </tr>
        <tr>
            `+row3HTML+`
        </tr>
        <tr>
            `+row4HTML+`
        </tr>
    </tbody>
</table>`;

    console.log(calendarHTML);

    fs.writeFileSync('./views/partials/createEventPartials/calendarHTML.ejs', '');
    fs.appendFileSync('./views/partials/createEventPartials/calendarHTML.ejs', calendarHTML);
    res.render('createEvent/createEvent_date'); 
};

const createEvent_createEventGuestList = (req,res) => {
    res.render('createEvent/createEvent_guestList');
};

const createEvent_createEventVenue = (req,res) => {
    res.render('createEvent/createEvent_venue');
};

const createEvent_createEventProvisions = (req,res) => {
    res.render('createEvent/createEvent_provisions');
};

const createEvent_communityEventInfo = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/'); 
    } else {
        EventTypeLog = 'Community';
        req.session.eventType = EventTypeLog;
        console.log(req.session);
        const appended_html_inspiration = [];
        con.query("SELECT * FROM event_database WHERE EventType = '"+EventTypeLog+"'", function (err, result) {
            if (err) throw err;
            console.log(result.length);
        if (result != '') {
            for(var i = 0; i < result.length; i++){
                appended_html_inspiration[i] = `
                <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Event title</h5>
                <p class="card-text">Date: `+result[i].EventDate+`</p>
                <p class="card-text">Type: `+result[i].EventType+`</p>
                <p class="card-text">Venue: `+result[i].EventVenue+`</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>`;
            }
        } else {
            console.log('No Past Events of this Type');
            appended_html_inspiration[0] = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">No Past Events of this Type</h5>
            <a href="#" class="btn btn-primary">See Other Events</a>
            </div>
            </div>`;
        };
        });
        const appended_html_info = `
                    <div class = "rightFloatType">
                    <p>Community Event Info</p>
                    <p>ideas for events</p>
                    <p>get people excited</p>
                    <p>uses info to create event brief auto</P>
                    </div>`;
        const appended_html_buttons = `
        <%- include('./communitySelected.ejs') %>
    `;

    fs.writeFile('./views/partials/createEventPartials/eventInfo.ejs', '', (err) => {
        if (err) throw err;
        console.log('Empty page written');
        fs.appendFile('./views/partials/createEventPartials/eventInfo.ejs', appended_html_info, (err) => {
            if (err) throw err;
            console.log('Append succesful');
            fs.writeFile('./views/partials/createEventPartials/typeButtons.ejs', '', (err) => {
                if (err) throw err;
                console.log('Empty page written');
                fs.appendFile('./views/partials/createEventPartials/typeButtons.ejs', appended_html_buttons, (err) => {
                    if (err) throw err;
                    console.log('Append succesful');
                    fs.writeFile('./views/partials/createEventPartials/typeInspiration.ejs', '', (err) => {
                        if (err) throw err;
                        console.log('Empty page written');
                        for(var i = 0; i < appended_html_inspiration.length; i++){
                            fs.appendFileSync('./views/partials/createEventPartials/typeInspiration.ejs', appended_html_inspiration[i]);
                            console.log(i+' Append succesful');
                            if (i === appended_html_inspiration.length - 1) {
                                console.log('all appends done');
                                res.render('createEvent/createEvent_type');
                            };
                        };
                    });
                });
            });
        });
    });
    };
};

const createEvent_socialEventInfo = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/');
    } else {
        EventTypeLog = 'Social';
        const appended_html_inspiration = [];
        con.query("SELECT * FROM event_database WHERE EventType = '"+EventTypeLog+"'", function (err, result) {
            if (err) throw err;
            console.log(result.length);
        if (result != '') {
            for(var i = 0; i < result.length; i++){
                appended_html_inspiration[i] = `
                <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Event title</h5>
                <p class="card-text">Date: `+result[i].EventDate+`</p>
                <p class="card-text">Type: `+result[i].EventType+`</p>
                <p class="card-text">Venue: `+result[i].EventVenue+`</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>`;
            }
        } else {
            console.log('No Past Events of this Type');
            appended_html_inspiration[0] = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">No Past Events of this Type</h5>
            <a href="#" class="btn btn-primary">See Other Events</a>
            </div>
            </div>`;
        };
        });
        const appended_html_info = `
                    <div class = "rightFloatType">
                    <p>Social Event Info</p>
                    <p>ideas for events</p>
                    <p>get people excited</p>
                    <p>uses info to create event brief auto</P>
                    </div>`;
        const appended_html_buttons = `
        <%- include('./socialSelected.ejs') %>
    `;
    fs.writeFile('./views/partials/createEventPartials/eventInfo.ejs', '', (err) => {
        if (err) throw err;
        console.log('Empty page written');
        fs.appendFile('./views/partials/createEventPartials/eventInfo.ejs', appended_html_info, (err) => {
            if (err) throw err;
            console.log('Append succesful');
            fs.writeFile('./views/partials/createEventPartials/typeButtons.ejs', '', (err) => {
                if (err) throw err;
                console.log('Empty page written');
                fs.appendFile('./views/partials/createEventPartials/typeButtons.ejs', appended_html_buttons, (err) => {
                    if (err) throw err;
                    console.log('Append succesful');
                    fs.writeFile('./views/partials/createEventPartials/typeInspiration.ejs', '', (err) => {
                        if (err) throw err;
                        console.log('Empty page written');
                        for(var i = 0; i < appended_html_inspiration.length; i++){
                            fs.appendFileSync('./views/partials/createEventPartials/typeInspiration.ejs', appended_html_inspiration[i]);
                            console.log(i+' Append succesful');
                            if (i === appended_html_inspiration.length - 1) {
                                console.log('all appends done');
                                res.render('createEvent/createEvent_type');
                            };
                        };
                    });
                });
            });
        });
    });
    };
};

const createEvent_tournamentEventInfo = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/');
    } else {
        EventTypeLog = 'Tournament';
        const appended_html_inspiration = [];
        con.query("SELECT * FROM event_database WHERE EventType = '"+EventTypeLog+"'", function (err, result) {
            if (err) throw err;
            console.log(result.length);
        if (result != '') {
            for(var i = 0; i < result.length; i++){
                appended_html_inspiration[i] = `
                <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Event title</h5>
                <p class="card-text">Date: `+result[i].EventDate+`</p>
                <p class="card-text">Type: `+result[i].EventType+`</p>
                <p class="card-text">Venue: `+result[i].EventVenue+`</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>`;
            }
        } else {
            console.log('No Past Events of this Type');
            appended_html_inspiration[0] = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">No Past Events of this Type</h5>
            <a href="#" class="btn btn-primary">See Other Events</a>
            </div>
            </div>`;
        };
        });
        const appended_html_info = `
                    <div class = "rightFloatType">
                    <p>Tournament Event Info</p>
                    <p>ideas for events</p>
                    <p>get people excited</p>
                    <p>uses info to create event brief auto</P>
                    </div>`;
        const appended_html_buttons = `
        <%- include('./tournamentSelected.ejs') %>
    `;
    fs.writeFile('./views/partials/createEventPartials/eventInfo.ejs', '', (err) => {
        if (err) throw err;
        console.log('Empty page written');
        fs.appendFile('./views/partials/createEventPartials/eventInfo.ejs', appended_html_info, (err) => {
            if (err) throw err;
            console.log('Append succesful');
            fs.writeFile('./views/partials/createEventPartials/typeButtons.ejs', '', (err) => {
                if (err) throw err;
                console.log('Empty page written');
                fs.appendFile('./views/partials/createEventPartials/typeButtons.ejs', appended_html_buttons, (err) => {
                    if (err) throw err;
                    console.log('Append succesful');
                    fs.writeFile('./views/partials/createEventPartials/typeInspiration.ejs', '', (err) => {
                        if (err) throw err;
                        console.log('Empty page written');
                        for(var i = 0; i < appended_html_inspiration.length; i++){
                            fs.appendFileSync('./views/partials/createEventPartials/typeInspiration.ejs', appended_html_inspiration[i]);
                            console.log(i+' Append succesful');
                            if (i === appended_html_inspiration.length - 1) {
                                console.log('all appends done');
                                res.render('createEvent/createEvent_type');
                            };
                        };
                    });
                });
            });
        });
    });
    };
};

const createEvent_fundraisingEventInfo = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/');
    } else {
        EventTypeLog = 'Fundraising';
        const appended_html_inspiration = [];
        con.query("SELECT * FROM event_database WHERE EventType = '"+EventTypeLog+"'", function (err, result) {
            if (err) throw err;
            console.log(result.length);
        if (result != '') {
            for(var i = 0; i < result.length; i++){
                appended_html_inspiration[i] = `
                <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Event title</h5>
                <p class="card-text">Date: `+result[i].EventDate+`</p>
                <p class="card-text">Type: `+result[i].EventType+`</p>
                <p class="card-text">Venue: `+result[i].EventVenue+`</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>`;
            }
        } else {
            console.log('No Past Events of this Type');
            appended_html_inspiration[0] = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">No Past Events of this Type</h5>
            <a href="#" class="btn btn-primary">See Other Events</a>
            </div>
            </div>`;
        };
        });
        const appended_html_info = `
                    <div class = "rightFloatType">
                    <p>Fundraising Event Info</p>
                    <p>ideas for events</p>
                    <p>get people excited</p>
                    <p>uses info to create event brief auto</P>
                    </div>`;
        const appended_html_buttons = `
        <%- include('./fundraisingSelected.ejs') %>
    `;
        fs.writeFile('./views/partials/createEventPartials/eventInfo.ejs', '', (err) => {
            if (err) throw err;
            console.log('Empty page written');
            fs.appendFile('./views/partials/createEventPartials/eventInfo.ejs', appended_html_info, (err) => {
                if (err) throw err;
                console.log('Append succesful');
                fs.writeFile('./views/partials/createEventPartials/typeButtons.ejs', '', (err) => {
                    if (err) throw err;
                    console.log('Empty page written');
                    fs.appendFile('./views/partials/createEventPartials/typeButtons.ejs', appended_html_buttons, (err) => {
                        if (err) throw err;
                        console.log('Append succesful');
                        fs.writeFile('./views/partials/createEventPartials/typeInspiration.ejs', '', (err) => {
                            if (err) throw err;
                            console.log('Empty page written');
                            for(var i = 0; i < appended_html_inspiration.length; i++){
                                fs.appendFile('./views/partials/createEventPartials/typeInspiration.ejs', appended_html_inspiration[i], (err) => {
                                    if (err) throw err;
                                    console.log('Append succesful');
                                    res.render('createEvent/createEvent_type');
                                });
                            };
                        });
                    });
                });
            });
        });
    };
};

const createEvent_festivalEventInfo = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/');
    } else {
        EventTypeLog = 'Festival';
        const appended_html_inspiration = [];
        con.query("SELECT * FROM event_database WHERE EventType = '"+EventTypeLog+"'", function (err, result) {
            if (err) throw err;
            console.log(result.length);
        if (result != '') {
            for(var i = 0; i < result.length; i++){
                appended_html_inspiration[i] = `
                <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Event title</h5>
                <p class="card-text">Date: `+result[i].EventDate+`</p>
                <p class="card-text">Type: `+result[i].EventType+`</p>
                <p class="card-text">Venue: `+result[i].EventVenue+`</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>`;
            }
        } else {
            console.log('No Past Events of this Type');
            appended_html_inspiration[0] = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">No Past Events of this Type</h5>
            <a href="#" class="btn btn-primary">See Other Events</a>
            </div>
            </div>`;
        };
        });
        const appended_html_info = `
                    <div class = "rightFloatType">
                    <p>Festival Event Info</p>
                    <p>ideas for events</p>
                    <p>get people excited</p>
                    <p>uses info to create event brief auto</P>
                    </div>`;
        const appended_html_buttons = `
        <%- include('./festivalSelected.ejs') %>
    `;
    fs.writeFile('./views/partials/createEventPartials/eventInfo.ejs', '', (err) => {
        if (err) throw err;
        console.log('Empty page written');
        fs.appendFile('./views/partials/createEventPartials/eventInfo.ejs', appended_html_info, (err) => {
            if (err) throw err;
            console.log('Append succesful');
            fs.writeFile('./views/partials/createEventPartials/typeButtons.ejs', '', (err) => {
                if (err) throw err;
                console.log('Empty page written');
                fs.appendFile('./views/partials/createEventPartials/typeButtons.ejs', appended_html_buttons, (err) => {
                    if (err) throw err;
                    console.log('Append succesful');
                    fs.writeFile('./views/partials/createEventPartials/typeInspiration.ejs', '', (err) => {
                        if (err) throw err;
                        console.log('Empty page written');
                        for(var i = 0; i < appended_html_inspiration.length; i++){
                            fs.appendFileSync('./views/partials/createEventPartials/typeInspiration.ejs', appended_html_inspiration[i]);
                            console.log(i+' Append succesful');
                            if (i === appended_html_inspiration.length - 1) {
                                console.log('all appends done');
                                res.render('createEvent/createEvent_type');
                            };
                        };
                    });
                });
            });
        });
    });
    };
};

const createEvent_otherEventInfo = (req, res) => {
    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/');
    } else {
        EventTypeLog = 'Other';
        const appended_html_inspiration = [];
        con.query("SELECT * FROM event_database WHERE EventType = '"+EventTypeLog+"'", function (err, result) {
            if (err) throw err;
            console.log(result.length);
        if (result != '') {
            for(var i = 0; i < result.length; i++){
                appended_html_inspiration[i] = `
                <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Event title</h5>
                <p class="card-text">Date: `+result[i].EventDate+`</p>
                <p class="card-text">Type: `+result[i].EventType+`</p>
                <p class="card-text">Venue: `+result[i].EventVenue+`</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                </div>`;
            }
        } else {
            console.log('No Past Events of this Type');
            appended_html_inspiration[0] = `
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">No Past Events of this Type</h5>
                <a href="#" class="btn btn-primary">See Other Events</a>
                </div>
                </div>`;
        };
        });
        const appended_html_info = `
                    <div class = "rightFloatType">
                    <p>Othr Event Ideas</p>
                    <p>ideas for events</p>
                    <p>get people excited</p>
                    <p>uses info to create event brief auto</P>
                    </div>`;
        const appended_html_buttons = `
        <%- include('./otherSelected.ejs') %>
    `;
    fs.writeFile('./views/partials/createEventPartials/eventInfo.ejs', '', (err) => {
        if (err) throw err;
        console.log('Empty page written');
        fs.appendFile('./views/partials/createEventPartials/eventInfo.ejs', appended_html_info, (err) => {
            if (err) throw err;
            console.log('Append succesful');
            fs.writeFile('./views/partials/createEventPartials/typeButtons.ejs', '', (err) => {
                if (err) throw err;
                console.log('Empty page written');
                fs.appendFile('./views/partials/createEventPartials/typeButtons.ejs', appended_html_buttons, (err) => {
                    if (err) throw err;
                    console.log('Append succesful');
                    fs.writeFile('./views/partials/createEventPartials/typeInspiration.ejs', '', (err) => {
                        if (err) throw err;
                        console.log('Empty page written');
                        for(var i = 0; i < appended_html_inspiration.length; i++){
                            fs.appendFileSync('./views/partials/createEventPartials/typeInspiration.ejs', appended_html_inspiration[i]);
                            console.log(i+' Append succesful');
                            if (i === appended_html_inspiration.length - 1) {
                                console.log('all appends done');
                                res.render('createEvent/createEvent_type');
                            };
                        };
                    });
                });
            });
        });
    });
    };
};




module.exports = {
    createEvent_createEventMainGet,
    createEvent_createEventIndexGet,
    createEvent_createEventMain,
    createEvent_createEventType,
    createEvent_createEventDate,
    createEvent_createEventGuestList,
    createEvent_createEventVenue,
    createEvent_createEventProvisions,
    createEvent_communityEventInfo,
    createEvent_socialEventInfo,
    createEvent_tournamentEventInfo,
    createEvent_fundraisingEventInfo,
    createEvent_festivalEventInfo,
    createEvent_otherEventInfo
};
