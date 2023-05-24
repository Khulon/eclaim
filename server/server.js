const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
var async = require('async');

app.use(cors());
app.use(express.json());

var config = {
    user:'eclaim',
    password: 'Excm6745',
    server: '10.0.1.28',	
    driver: 'tedious',
    database: 'ECLAIM',
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        encrypt:false
    }

};

sql.connect(config, function (err) {
    if (err) console.log(err);
    console.log("Connected!");
});

app.get('/', function (req, res) {
    // create Request object
    var request = new sql.Request();
        
    // query to the database and get the records
    request.query('SELECT * from Accounts', function (err, rows) {
        
        if (err) console.log(err)

        // send records as a response
        res.send(rows.recordset);
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running on port ' + server.address().port + '...');
});

app.post('/register',(req, res) => {
    let email = {email: req.body.companyEmail};
    let password = {password: req.body.password};
    let statement = "INSERT INTO Accounts VALUES ('"+email.email+"','"+password.password+"')";
    var query = new sql.Request();
    query.query(statement)
    .then((result) => {
      res.json({result: result.recordset, message: "Account Created!"});})
    .catch((err) => {
      res.json({message: "Error!"});
    });
    
  });

app.get('/admin',(req, res) => {
  var request = new sql.Request();
        
    // query to the database and get the records
    request.query('SELECT * from Employees, Processors', function (err, rows) {
        
        if (err) console.log(err)

        // send records as a response
        res.send(rows.recordset);
    });
  

});


app.post('/login',(req, res) => {
  let email = {email: req.body.companyEmail};
  let password = {password: req.body.password};
  let statement = "SELECT COUNT(*) AS count FROM Accounts WHERE email = '"+email.email+"' and password = '"+password.password+"'";
  let checkAdmin = "SELECT COUNT(*) AS count FROM SystemAdmins WHERE email = '"+email.email+"' and password = '"+password.password+"'";
  var query = new sql.Request();
  var adminQuery = new sql.Request();
  adminQuery.query(checkAdmin)
  .then((result) => {

    let count = result.recordset[0].count;
    if(count == 1) {
      res.send({email: email, userType: "Admin", message: "Login Successful!"});	
    } else {
      query.query(statement)
      .then((result) => {

        let count = result.recordset[0].count;
        if(count == 1) {
          res.send({email: email, userType: "Normal", message: "Login Successful!"});
        } else {
          res.json({message: "Login Failed!"});
        }
      });
    }
  })
  .catch((err) => {
    res.json({message: "Error!"});
  });
});