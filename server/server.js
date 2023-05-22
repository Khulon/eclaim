const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();

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
    request.query('SELECT * from Employees', function (err, rows) {
        
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
    query.query(statement, email, password,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    }); 
  });