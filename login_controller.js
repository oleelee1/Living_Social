var mysql = require('mysql');
var con = require('../SQL/mysql_initiation');
const fs = require('fs');
const { postcodeValidator, postcodeValidatorExistsForCountry } = require('postcode-validator');


// functions
function validateEmail(email){
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// variables
var chk = true;
var signup_error_msg = "Incorrect field(s): ";
var final_signup_error_msg = "";

const login_signupdetails = (req, res) => {
    console.log(req.body);
    firstName_input = req.body.firstName;
    lastName_input = req.body.lastName;
    email_input = req.body.email;
    username_input = req.body.username;
    password_input = req.body.password;
    signup_error_msg = "Incorrect field(s): ";
    final_signup_error_msg = '';
    chk = true;
      if(req.body.firstName == '') {
         console.log('Enter First Name');
         signup_error_msg += 'First Name; ';
         chk = false;
      };
      if(req.body.email == '') {
        console.log('Enter email');
        signup_error_msg += 'Email Address; ';
        chk = false;
      } else if (!validateEmail(req.body.email)){
        console.log('Enter valid email address');
        signup_error_msg += 'Valid Email Address; ';
        chk = false;
      };
      if(req.body.username == '') {
        console.log('Enter username');
        signup_error_msg += 'Username; ';
        chk = false;
      };
      if(req.body.password == '') {
        console.log('Enter password');
        signup_error_msg += 'Password; ';
        chk = false;
      };
      if (!chk) {
        console.log('one or more input fields invalid');
        final_signup_error_msg = signup_error_msg.slice(0, -2);
        const appended_html = `
        <html>
          <%- include('../partials/housekeepingPartials/head.ejs') %>

        <!-- #######################      UPPER NAV BAR       ##################### -->

          <body>
            <header>
              <%- include('../partials/loginPartials/login_nav.ejs') %>
            </header>

            <!-- ###################################        MAIN        #################################-->


            <main>
              <div id = 'login_signup_field'>
                <%- include('../partials/loginPartials/login_field.ejs') %>
                        <div id = "signup_field">
                            <h2 class = "signup_login_headings">Sign-up</h2>
                            <form id="signup_details" name = "signup_details" action = "/login/signupdetails" method="POST" type="text">
                                <div class="mb-3">
                                  <label class="form-label" for="firstName">First Name:</label>
                                  <input class="form-control" type="text" id="firstName" name="firstName" value =`+firstName_input+`>
                                  <label class="form-label" for="lastName">Last Name:</label>
                                  <input class="form-control" type="text" id="lastName" name="lastName" value =`+lastName_input+`>
                                  <label class="form-label" for="email">Email address:</label>
                                  <input class="form-control" type="text" id="email" name="email" aria-describedby="emailHelp" value =`+email_input+`>
                                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="username">Username:</label>
                                    <input class="form-control" type="text" id="username" name="username" value = `+username_input+`>
                                    <label class="form-label" for="password">Password:</label>
                                    <input class="form-control" type="password" id="password" name="password" value = `+password_input+`>
                                    <div> 
                                        <button  id = "Submit" style="display:block width:10vw;" type="submit" value="Submit" class="btn btn-primary" aria-describedby="signupHelp" >Submit</button>
                                    </div>
                                </div>
                                        <div id="signupHelp" class="form-text">`+final_signup_error_msg+`</div>
                            </form>
                          </div>
                        </div>
                      </main>

        <!-- ###################################        END OF MAIN        #################################-->

            <footer>

            </footer>

              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
              <script src = "/variables.js"></script>
              <script src = "/js_test.js"></script>

          </body>
        </html>`;
        fs.writeFile('./views/login/signup_error.ejs', '', (err) => {
          if (err) throw err;
          fs.appendFile('./views/login/signup_error.ejs', appended_html, (err) => {
            if (err) throw err;
            res.redirect('/login/signup_error');
          });
        });
      } else {
          console.log("Info Correct - ask user to confirm");
          const appended_html = `
        <html>
          <%- include('../partials/housekeepingPartials/head.ejs') %>

        <!-- #######################      UPPER NAV BAR       ##################### -->

          <body>
            <header>
              <%- include('../partials/loginPartials/login_nav.ejs') %>
            </header>

            <!-- ###################################        MAIN        #################################-->


            <main>
              <div id = 'login_signup_field'>
                <%- include('../partials/loginPartials/login_field.ejs') %>
                        <div id = "signup_field">
                            <h2 class = "signup_login_headings">Sign-up</h2>
                            <form id="signup_details" name = "signup_details" action = "/login/signup_success" method="POST" type="text">
                                <div class="mb-3">
                                  <label class="form-label" for="firstName">First Name:</label>
                                  <input class="form-control" type="text" id="firstName" name="firstName" value =`+firstName_input+`>
                                  <label class="form-label" for="lastName">Last Name:</label>
                                  <input class="form-control" type="text" id="lastName" name="lastName" value =`+lastName_input+`>
                                  <label class="form-label" for="email">Email address:</label>
                                  <input class="form-control" type="text" id="email" name="email" aria-describedby="emailHelp" value =`+email_input+`>
                                  <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" for="username">Username:</label>
                                    <input class="form-control" type="text" id="username" name="username" value = `+username_input+`>
                                    <label class="form-label" for="password">Password:</label>
                                    <input class="form-control" type="password" id="password" name="password" value = `+password_input+`>
                                    <div>
                                      <button  id = "Submit" style="display:block; width:10vw" type="submit" value="Submit" class="btn btn-primary" aria-describedby="signupHelp">Continue!</button>
                                    </div>
                                </div>
                                      <div id="signupHelp" class="form-text">Sufficient info - please check befor continuing with Living Social</div>
                            </form>
                          </div>
                        </div>
                      </main>

        <!-- ###################################        END OF MAIN        #################################-->

            <footer>

            </footer>

              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
              <script src = "/variables.js"></script>
              <script src = "/js_test.js"></script>

          </body>
        </html>`;
        fs.writeFile('./views/login/checksignupdetails.ejs', '', (err) => {
          if (err) throw err;
          fs.appendFile('./views/login/checksignupdetails.ejs', appended_html, (err) => {
            if (err) throw err;
            res.redirect('/login/checksignupdetails');
          });
        });
      };
};

const login_signupsuccess = (req, res) => {
  console.log(req.body);
  firstName_input = req.body.firstName;
  lastName_input = req.body.lastName;
  email_input = req.body.email;
  username_input = req.body.username;
  password_input = req.body.password;
  signup_error_msg = "Incorrect field(s): ";
  final_signup_error_msg = '';
  chk = true;
    if(req.body.firstName == '') {
       console.log('Enter Full name');
       signup_error_msg += 'Full Name; ';
       chk = false;
    };
    if(req.body.email == '') {
      console.log('Enter email');
      signup_error_msg += 'Email Address; ';
      chk = false;
    } else if (!validateEmail(req.body.email)){
      console.log('Enter valid email address');
      signup_error_msg += 'Valid Email Address; ';
      chk = false;
    };
    if(req.body.username == '') {
      console.log('Enter username');
      signup_error_msg += 'Username; ';
      chk = false;
    };
    if(req.body.password == '') {
      console.log('Enter password');
      signup_error_msg += 'Password; ';
      chk = false;
    };
    if (!chk) {
      console.log('one or more input fields invalid');
      final_signup_error_msg = signup_error_msg.slice(0, -2);
      const appended_html = `
      <html>
        <%- include('../partials/housekeepingPartials/head.ejs') %>

      <!-- #######################      UPPER NAV BAR       ##################### -->

        <body>
          <header>
            <%- include('../partials/loginPartials/login_nav.ejs') %>
          </header>

          <!-- ###################################        MAIN        #################################-->


          <main>
            <div id = 'login_signup_field'>
              <%- include('../partials/loginPartials/login_field.ejs') %>
                      <div id = "signup_field">
                          <h2 class = "signup_login_headings">Sign-up</h2>
                          <form id="signup_details" name = "signup_details" action = "/login/signupdetails" method="POST" type="text">
                              <div class="mb-3">
                                <label class="form-label" for="firstName">First Name:</label>
                                <input class="form-control" type="text" id="firstName" name="firstName" value =`+firstName_input+`>
                                <label class="form-label" for="lastName">Last Name:</label>
                                <input class="form-control" type="text" id="lastName" name="lastName" value =`+lastName_input+`>
                                <label class="form-label" for="email">Email address:</label>
                                <input class="form-control" type="text" id="email" name="email" aria-describedby="emailHelp" value =`+email_input+`>
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                              </div>
                              <div class="mb-3">
                                  <label class="form-label" for="username">Username:</label>
                                  <input class="form-control" type="text" id="username" name="username" value = `+username_input+`>
                                  <label class="form-label" for="password">Password:</label>
                                  <input class="form-control" type="password" id="password" name="password" value = `+password_input+`>
                                  <div>
                                    <button  id = "Submit" style="display:block width:10vw" type="submit" value="Submit" class="btn btn-primary" aria-describedby="signupHelp">Submit</button>
                                  </div>
                              </div>
                                    <div id="signupHelp" class="form-text">`+final_signup_error_msg+`</div>
                          </form>
                        </div>
                      </div>
                    </main>

      <!-- ###################################        END OF MAIN        #################################-->

          <footer>

          </footer>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
            <script src = "/variables.js"></script>
            <script src = "/js_test.js"></script>

        </body>
      </html>`;
      fs.writeFile('./views/login/signup_error.ejs', '', (err) => {
        if (err) throw err;
        fs.appendFile('./views/login/signup_error.ejs', appended_html, (err) => {
          if (err) throw err;
          res.redirect('/login/signup_error');
        });
      });
    } else {
      var sql = "INSERT INTO user_database (firstName, lastName, email, username, password) VALUES ('"+firstName_input+"','"+lastName_input+"','"+email_input+"','"+username_input+"','"+password_input+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        console.log("Info added");
      });
      var sql = "SELECT user_id FROM `mydb`.`user_database` WHERE (username = '"+username_input+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        req.session.newUserid = result[0].user_id;
        console.log('new user_id: '+req.session.newUserid);
        res.render('login/signup_success');
      });
    };
};

const login_locationDetails = (req, res) => {
  console.log(req.body);
  const postcode_input = req.body.postcode;
  const line1_input = req.body.addressLine1;
  const line2_input = req.body.addressLine2;
  const line3_input = req.body.addressLine3;
  const townCity_input = req.body.addressTownCity;
  const country_input = req.body.addressCountry;
  signup_error_msg = "Incorrect field(s): ";
  final_signup_error_msg = '';
  chk = true;
    if(req.body.postcode == '') {
       signup_error_msg += 'Postcode; ';
       chk = false;
    } else if (!postcodeValidator(req.body.postcode, 'GB')){
      signup_error_msg += 'Valid Postcode; ';
      chk = false;
    };
    if(req.body.addressLine1 == '') {
      signup_error_msg += 'Address line 1; ';
      chk = false;
    };
    if(req.body.addressLine2 == '') {
      signup_error_msg += 'Address line 2; ';
      chk = false;
    };
    if(req.body.addressTownCity == '') {
      signup_error_msg += 'Town/City; ';
      chk = false;
    };
    if(req.body.addressCountry == '') {
      signup_error_msg += 'Country; ';
      chk = false;
    };
    if (!chk) {
      console.log('one or more input fields invalid');
      final_signup_error_msg = signup_error_msg.slice(0, -2);
      const appended_html = `
          <html>
      <%- include('../partials/housekeepingPartials/head.ejs') %>

    <!-- #######################      UPPER NAV BAR       ##################### -->

      <body>
        <header>
          <%- include('../partials/loginPartials/login_nav.ejs') %>
        </header>

        <!-- ###################################        MAIN        #################################-->


        <main>

        <div id = 'location_field'>
        <h2 class = "location_heading">Location</h2>
        <form id="location_details" name = "location_details" action = "/login/locationDetails" method="POST" type="text">
            <div id = "postcode_details" class="mb-3">
                <label class="form-label" for="postcode">Postcode:</label>
                <input class="form-control" type="text" id="postcode" name="postcode" value = "`+postcode_input+`">
            </div>
            <div id = "address_details" class = "mb-3">
                <div>
                    <label class="form-label" for="addressLine1">Address Line 1:</label>
                    <input class="form-control" type="text" id="addressLine1" name="addressLine1" value = "`+line1_input+`">
                    <label class="form-label" for="addressLine2">Address Line 2:</label>
                    <input class="form-control" type="text" id="addressLine2" name="addressLine2" value = "`+line2_input+`">
                    <label class="form-label" for="addressLine3">Address Line 3:</label>
                    <input class="form-control" type="text" id="addressLine3" name="addressLine3" value = "`+line3_input+`">
                </div>
                <div>
                    <label class="form-label" for="addressTownCity">Town / City:</label>
                    <input class="form-control" type="text" id="addressTownCity" name="addressTownCity" value = "`+townCity_input+`"> 
                    <label class="form-label" for="addressCountry">Country:</label>
                    <input class="form-control" type="text" id="addressCountry" name="addressCountry" value = "`+country_input+`">
                    <div>
                        <button  id = "Submit" style="display:block" type="submit" value="Submit" class="btn btn-primary" aria-describedby="signupHelp">Submit</button>
                    </div>
                </div>
                  <div id="signupHelp" class="form-text">`+final_signup_error_msg+`</div>
            </div>
        </form>
        <form id="location_continue" name = "location_continue" action = "/index/" method="GET" type="text">
            <button  id = "Submit" style="display:block; background-color: transparent; color: blue;" type="submit" value="Submit" class="btn btn-primary">Continue to homepage</button>
        </form >
    </div>

        </main>

    <!-- ###################################        END OF MAIN        #################################-->

        <footer>

        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
        <script src = "/variables.js"></script>
        <script src = "/login_script.js"></script>

      </body>
    </html>
    `;
    fs.writeFile('./views/login/location_error.ejs', '', (err) => {
      if (err) throw err;
      fs.appendFile('./views/login/location_error.ejs', appended_html, (err) => {
        if (err) throw err;
        res.redirect('/login/location_error');
      });
    });
    } else {
      console.log("Info Correct - ask user to confirm");
      console.log(line1_input);
      const appended_html = `
      <html>
  <%- include('../partials/housekeepingPartials/head.ejs') %>

<!-- #######################      UPPER NAV BAR       ##################### -->

  <body>
    <header>
      <%- include('../partials/loginPartials/login_nav.ejs') %>
    </header>

    <!-- ###################################        MAIN        #################################-->


    <main>

    <div id = 'location_field'>
    <h2 class = "location_heading">Location</h2>
    <form id="location_details" name = "location_details" action = "/login/locationSuccess" method="POST" type="text">
        <div id = "postcode_details" class="mb-3">
            <label class="form-label" for="postcode">Postcode:</label>
            <input class="form-control" type="text" id="postcode" name="postcode" value = "`+postcode_input+`">
        </div>
        <div id = "address_details" class = "mb-3">
            <div>
                <label class="form-label" for="addressLine1">Address Line 1:</label>
                <input class="form-control" type="text" id="addressLine1" name="addressLine1" value = "`+line1_input+`">
                <label class="form-label" for="addressLine2">Address Line 2:</label>
                <input class="form-control" type="text" id="addressLine2" name="addressLine2" value = "`+line2_input+`">
                <label class="form-label" for="addressLine3">Address Line 3:</label>
                <input class="form-control" type="text" id="addressLine3" name="addressLine3" value = "`+line3_input+`">
            </div>
            <div>
                <label class="form-label" for="addressTownCity">Town / City:</label>
                <input class="form-control" type="text" id="addressTownCity" name="addressTownCity" value = "`+townCity_input+`"> 
                <label class="form-label" for="addressCountry">Country:</label>
                <input class="form-control" type="text" id="addressCountry" name="addressCountry" value = "`+country_input+`">
                <div>
                    <button  id = "Submit" style="display:block" type="submit" value="Submit" class="btn btn-primary" aria-describedby="signupHelp">Continue!</button>
                </div>
            </div>
              <div id="signupHelp" class="form-text">Sufficient info - check before proceeding</div>
        </div>
    </form>
    <form id="location_continue" name = "location_continue" action = "/index/" method="GET" type="text">
        <button  id = "Submit" style="display:block; background-color: transparent; color: blue;" type="submit" value="Submit" class="btn btn-primary">Continue to homepage</button>
    </form >
</div>

    </main>

<!-- ###################################        END OF MAIN        #################################-->

    <footer>

    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    <script src = "/variables.js"></script>
    <script src = "/login_script.js"></script>

  </body>
</html>
`;
    fs.writeFile('./views/login/checklocationdetails.ejs', '', (err) => {
      if (err) throw err;
      fs.appendFile('./views/login/checklocationdetails.ejs', appended_html, (err) => {
        if (err) throw err;
        res.redirect('/login/checklocationdetails');
      });
    });
  };
};

const login_locationSuccess = (req, res) => {
  console.log(req.body);
  const postcode_input = req.body.postcode;
  const line1_input = req.body.addressLine1;
  const line2_input = req.body.addressLine2;
  const line3_input = req.body.addressLine3;
  const townCity_input = req.body.addressTownCity;
  const country_input = req.body.addressCountry;
  const id = req.body.user_id;
  console.log(line1_input);
  signup_error_msg = "Incorrect field(s): ";
  final_signup_error_msg = '';
  chk = true;
    if(req.body.postcode == '') {
       signup_error_msg += 'Postcode; ';
       chk = false;
    };
    if(req.body.addressLine1 == '') {
      signup_error_msg += 'Address line 1; ';
      chk = false;
    };
    if(req.body.addressline2 == '') {
      signup_error_msg += 'Address line 2; ';
      chk = false;
    };
    if(req.body.addressTownCity == '') {
      signup_error_msg += 'Town/City; ';
      chk = false;
    };
    if(req.body.addressCountry == '') {
      signup_error_msg += 'Country; ';
      chk = false;
    };
    if (!chk) {
      console.log('one or more input fields invalid');
      final_signup_error_msg = signup_error_msg.slice(0, -2);
      const appended_html =  `
      <html>
  <%- include('../partials/housekeepingPartials/head.ejs') %>

<!-- #######################      UPPER NAV BAR       ##################### -->

  <body>
    <header>
      <%- include('../partials/loginPartials/login_nav.ejs') %>
    </header>

    <!-- ###################################        MAIN        #################################-->


    <main>

    <div id = 'location_field'>
    <h2 class = "location_heading">Location</h2>
    <form id="location_details" name = "location_details" action = "/login/locationDetails" method="POST" type="text">
        <div id = "postcode_details" class="mb-3">
            <label class="form-label" for="postcode">Postcode:</label>
            <input class="form-control" type="text" id="postcode" name="postcode" value = "`+postcode_input+`">
        </div>
        <div id = "address_details" class = "mb-3">
            <div>
                <label class="form-label" for="addressLine1">Address Line 1:</label>
                <input class="form-control" type="text" id="addressLine1" name="addressLine1" value = "`+line1_input+`">
                <label class="form-label" for="addressLine2">Address Line 2:</label>
                <input class="form-control" type="text" id="addressLine2" name="addressLine2" value = "`+line2_input+`">
                <label class="form-label" for="addressLine3">Address Line 3:</label>
                <input class="form-control" type="text" id="addressLine3" name="addressLine3" value = "`+line3_input+`">
            </div>
            <div>
                <label class="form-label" for="addressTownCity">Town / City:</label>
                <input class="form-control" type="text" id="addressTownCity" name="addressTownCity" value = "`+townCity_input+`"> 
                <label class="form-label" for="addressCountry">Country:</label>
                <input class="form-control" type="text" id="addressCountry" name="addressCountry" value = "`+country_input+`">
                <div>
                    <button  id = "Submit" style="display:block" type="submit" value="Submit" class="btn btn-primary" aria-describedby="signupHelp">Submit</button>
                </div>
            </div>
              <div id="signupHelp" class="form-text">`+final_signup_error_msg+`</div>
        </div>
    </form>
    <form id="location_continue" name = "location_continue" action = "/index/" method="GET" type="text">
        <button  id = "Submit" style="display:block; background-color: transparent; color: blue;" type="submit" value="Submit" class="btn btn-primary">Continue to homepage</button>
    </form >
</div>

    </main>

<!-- ###################################        END OF MAIN        #################################-->

    <footer>

    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    <script src = "/variables.js"></script>
    <script src = "/login_script.js"></script>

  </body>
</html>
`;
  fs.writeFile('./views/login/location_error.ejs', '', (err) => {
    if (err) throw err;
    fs.appendFile('./views/login/location_error.ejs', appended_html, (err) => {
      if (err) throw err;
      res.redirect('/login/location_error');
    });
  });
  } else {
    var sql = "UPDATE `mydb`.`user_database` SET `postcode` = '"+postcode_input+"', `addressLine1` = '"+line1_input+"', `addressLine2` = '"+line2_input+"', `addressLine3` = '"+line3_input+"', `addressTownCity` = '"+townCity_input+"', `addressCountry` = '"+country_input+"' , `localGroup` = '"+townCity_input+"' WHERE (`user_id` = '"+req.session.newUserid+"');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      req.session.userInfo[0].postcode = postcode_input;
      req.session.userInfo[0].localGroup = townCity_input;
      var sql = "SELECT * FROM mydb.group_database WHERE (`groupName` = '"+townCity_input+"');";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('groupName equal to town input: '+result);

        if(result == ''){
          var sql = "INSERT INTO `mydb`.`group_database` (`groupName`, `groupMembers`, `groupPostcode`) VALUES ('"+townCity_input+"', '1', '"+postcode_input.substring(0,6)+"')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + ' row added');
            res.redirect('/index');
          });
        } else {
          const members = result[0].groupMembers + 1;
          var sql = "UPDATE group_database SET groupMembers = '"+members+"' WHERE groupName = '"+townCity_input+"'";
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            res.redirect('/index');
          });
        };
      });
    });
  };
};

const login_logindetails = (req, res) => {
  console.log(req.body);
  username_input = req.body.username;
  email_input = req.body.email;
  password_input = req.body.password;
    con.query("SELECT user_id, firstName, lastName, email, username, postcode, localGroup FROM user_database WHERE (username = '"+username_input+"' AND password = '"+password_input+"') OR (email = '"+email_input+"' AND password = '"+password_input+"')", function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result != '') {
        console.log('Welcome '+result[0].firstName+', we will log you in');
        req.session.userInfo = result;
        console.log(req.session);
        if (result[0].postcode == null){
          res.redirect('/login/locationEntry');
        } else {
          res.redirect('/index');
        }
      } else {
        res.redirect('/login/login_error');
      };
    });
};


const login_loginpage = (req,res) => {
    res.render('login/login');
};

const login_loginerror = (req,res) => {
  res.render('login/login_error');
}

const login_signuperror = (req,res) => {
  res.render('login/signup_error');
}

const login_checksignupdetails = (req, res) => {
  res.render('login/checksignupdetails')
}

const login_locationEntry = (req,res) => {
  res.render('login/locationEntry')
}

const login_locationError = (req,res) => {
  res.render('login/location_error');
}

const login_checklocationdetails = (req, res) => {
  res.render('login/checklocationdetails')
}

module.exports = {
    login_signupdetails,
    login_logindetails,
    login_loginpage,
    login_signuperror,
    login_loginerror,
    login_checksignupdetails,
    login_signupsuccess,
    login_locationEntry,
    login_locationDetails,
    login_locationSuccess,
    login_locationError,
    login_checklocationdetails,
};