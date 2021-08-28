var mysql = require('mysql');
var con = require('../SQL/mysql_initiation');
const fs = require('fs');

const accountMain = (req, res) => {

    if (req.session.userInfo == undefined){
        console.log('Not signed in');
        res.redirect('/login/');
    };

    console.log(req.session);
    console.log('logged in as: '+req.session.userInfo[0].username);
    var userFirstName = req.session.userInfo[0].firstName;
    var userLastName = req.session.userInfo[0].lastName;
    var userEmail = req.session.userInfo[0].email;
    var userUsername = req.session.userInfo[0].username;
    var userPostcode = req.session.userInfo[0].postcode;
    var userLocalGroup = req.session.userInfo[0].localGroup;
    console.log(req.session.userInfo[0].localGroup);
    const appended_html =  `
    <html>
	<%- include('../partials/housekeepingPartials/head.ejs') %>

	<body>
		<header>

			<%- include('../partials/housekeepingPartials/nav.ejs') %>

		</header>

		<main>

			<center>
                <div>
                    <h3>`+userFirstName+"'s "+`Account - Main Page</h3>
                </div>
			</center>

			<%- include('../partials/housekeepingPartials/leftSide_nav.ejs') %>
            <%- include('../partials/housekeepingPartials/rightSide_nav.ejs') %>
            
            <br><br>

			<div id="accountMain_summary" class="container-fluid">
                <div id="accountSummaryTitle" class = "mb-3">
                    <h3>Account Summary</h3>
                </div>
                <div id="accountSummaryBody" class = "mb-3">
                    <div>
                        <dl class="row">
                            <dt class="col-sm-3">Username: </dt>
                            <dd class="col-sm-9">`+userUsername+`</dd>

                            <dt class="col-sm-3">First Name: </dt>
                            <dd class="col-sm-9">`+userFirstName+`</dd>

                            <dt class="col-sm-3">Last Name: </dt>
                            <dd class="col-sm-9">`+userLastName+`</dd>
                        </dl>
                    </div>
                    <div>
                        <dl class="row">
                            <dt class="col-sm-3">Email: </dt>
                            <dd class="col-sm-9">`+userEmail+`</dd>

                            <dt class="col-sm-3">Postcode: </dt>
                            <dd class="col-sm-9">`+userPostcode+`</dd>

                            <dt class="col-sm-3">Local Group: </dt>
                            <dd class="col-sm-9">`+userLocalGroup+`</dd>
                        </dl>
                    </div>
                </div>
			</div>

		</main>

		<footer>

		</footer>

		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
		<script src="/variables.js"></script>
	</body>


</html>
`;
    fs.writeFile('./views/account/main.ejs', '', (err) => {
    if (err) throw err;
        fs.appendFile('./views/account/main.ejs', appended_html, (err) => {
        if (err) throw err;
        res.render('account/main');
        });
    });
};


module.exports = {
    accountMain,
};