const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
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

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT * from Employees', function (err, rows) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(rows.recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

