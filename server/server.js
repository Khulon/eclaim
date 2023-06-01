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


//Connect to database
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
        res.send(rows.recordset[0]);
    });
});



var server = app.listen(5000, function () {
    console.log('Server is running on port ' + server.address().port + '...');
});



//User registers an account
app.post('/register', (req, res) => {
    let email = req.body.companyEmail;
    let password = req.body.password;
    let statement = "INSERT INTO Accounts VALUES ('"+email+"','"+password+"')";
    var query = new sql.Request();
     query.query(statement)
    .then((result) => {
      res.json({user: email, userType: "Normal", message: "Account Created!"});})
    .catch((err) => {
      console.log(err)
      res.json({message: "Error!"});
    });
    
  });



//Load all users on admin home page
app.get('/admin',(req, res) => {
  var request = new sql.Request();
        
    // query to the database and get the records
    request.query('SELECT DISTINCT E.email, name, company_prefix, processor, E.approver, supervisor, approver_name, '
    + 'processor_email FROM Employees E JOIN BelongsToDepartments B ON E.email = B.email JOIN Approvers A ON A.department = B.department'
    + ' JOIN Processors P ON E.company_prefix = P.company', function (err, rows) {
        
        if (err) console.log(err)

        // send records as a response
        res.send(rows.recordset);
    });

});



//Fetch data for profile page
app.post('/getProfile', async (req, res) => {
  try {
    let email = req.body.email;
    var request = new sql.Request();
    
    const queryString = 'SELECT DISTINCT E.email, name, company_prefix, processor, E.approver, supervisor, approver_name, password, '
    + 'processor_email FROM Employees E JOIN BelongsToDepartments B ON E.email = B.email JOIN Approvers A ON A.department = B.department'
    + " JOIN Processors P ON E.company_prefix = P.company JOIN Accounts ON Accounts.email = E.email WHERE E.email = '"+email+"'"; 
  
    // query to the database and get the records
    const result = await request.query(queryString);
    
    res.send(result.recordset[0]);

  } catch(err) {
    console.log(err)
    res.send({message: "Error!"});
  }

});





//Load all departments that the user belongs to
app.post('/admin/editUser',(req, res) => {
  let email = req.body.email;
  var request = new sql.Request();

  request.query("SELECT department FROM BelongsToDepartments WHERE email = '"+email+"'",
   function (err, rows) {
      if (err) console.log(err)

      res.send(rows.recordset);
  });

});


//Admin edits user details
app.post('/admin/editUser/save', async (req, res) => {
  let name = req.body.name;
  let oldEmail = req.body.oldEmail;
  let newEmail = req.body.newEmail;
  let departments = req.body.department;
  let company = req.body.company;
  let isSupervisor = req.body.supervisor;
  let isApprover = req.body.approver;
  let isProcessor = req.body.processor;

  const newDpts = [];
  var insertDpts = "";
  
  for(var i = 0; i < departments.length; i++) {
    if(i == departments.length - 1) {
      insertDpts += "('"+newEmail+"'," + "'"+departments[i]+"');";
    } else {
      insertDpts += "('"+newEmail+"'," + "'"+departments[i]+"'),";
    }
  }

  departments.forEach((dpt) => { newDpts.push(dpt)});
    
  var request = new sql.Request();
  try{
     
    await request.query("SET XACT_ABORT ON " 
    + "BEGIN TRANSACTION "
    + "UPDATE Employees SET name = '"+name+"', company_prefix = '"+company+"', email = '"+newEmail+"', supervisor = '"+isSupervisor+"'"
    + ", approver = '"+isApprover+"', processor = '"+isProcessor+"' WHERE email = '"+oldEmail+"'"
    + "DELETE FROM BelongsToDepartments WHERE email = '"+oldEmail+"'; "
      + "INSERT INTO BelongsToDepartments VALUES" + insertDpts + " COMMIT TRANSACTION");


    res.send({message: "User Updated!"})

  } catch(err) { 
    console.log(err)
    res.send({message: "Failed to update user!"});
  }
  
});






//Admin deletes user
app.post('/admin/deleteUser', async (req, res) => {
  let email = req.body.oldEmail;
  var request = new sql.Request();

  await request.query("DELETE FROM Employees WHERE email = '"+email+"'")
  .then(() => {
      res.send({message: "User Deleted!"});
  })
  .catch((err) => {
    console.log(err)
    res.json({message: "Failed to delete user!"});
  });

});




//Admin adds user
app.post('/admin/addUser', async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let company = req.body.company;
  let departments = req.body.department;
  let isSupervisor = req.body.isSupervisor;
  let isApprover = req.body.isApprover;
  let isProcessor = req.body.isProcessor;

  var request = new sql.Request();
  await request.query("INSERT INTO Employees VALUES('"+email+"','"+name+"','"+company+"'," +
  "'"+isProcessor+"','"+isApprover+"','"+isSupervisor+"')")
  .then(() => {
    for(var i = 0; i < departments.length; i++) {
      var request = new sql.Request();
      request.query("INSERT INTO BelongsToDepartments VALUES('"+email+"','"+departments[i]+"')")
    }})
  .then(() => {
    res.send({email: email, departments: departments, message: "User Added!"})
  })
  .catch((err) => {
    console.log(err)
    res.json({message: "Failed to add user!"});
  })
});



//User to login
app.post('/login', async (req, res) => {
  let email = req.body.companyEmail;
  let password = req.body.password;
  let statement = "SELECT COUNT(*) AS count FROM Accounts WHERE email = '"+email+"' and password = '"+password+"'";
  let checkAdmin = "SELECT COUNT(*) AS count FROM SystemAdmins WHERE email = '"+email+"' and password = '"+password+"'";
  var query = new sql.Request();
  let name = await query.query("SELECT name AS name FROM Employees WHERE email = '"+email+"'");
  var adminQuery = new sql.Request();

  await adminQuery.query(checkAdmin)
  .then((result) => {

    let count = result.recordset[0].count;
    if(count == 1) {
      res.send({email: email, name: name.recordset[0].name, userType: "Admin", message: "Login Successful!"});	
    } else {
      query.query(statement)
      .then((result) => {

        let count = result.recordset[0].count;
        if(count == 1) {
          res.send({email: email, name: name.recordset[0].name, userType: "Normal", message: "Login Successful!"});
        } else {
          res.json({message: "Login Failed!"});
        }
      });
    }
  })
  
});



//User to add claim
app.post('/addClaim', async (req, res) => {
  let formCreator = req.body.creator;
  let expenseType = req.body.expenseType;
 
  var request = new sql.Request();

  let payPeriodFrom = req.body.payPeriodFrom;
  let payPeriodTo = req.body.payPeriodTo;
  let costCenter = req.body.costCenter;
  if (costCenter == "") {
    costCenter = null;
  }
  let note = req.body.note;

  if (expenseType == "Monthly") {
  
  try {

    const result = await request.query("SELECT GETDATE() AS currentDateTime, COUNT(*) AS count FROM Claims")
    const newFormId = result.recordset[0].count + 1;
    const fromDate = await request.query("SELECT PARSE('"+payPeriodFrom+"' as date USING 'AR-LB') AS fromDate")
    const toDate = await request.query("SELECT PARSE('"+payPeriodTo+"' as date USING 'AR-LB') AS toDate")
    
    const query = "SET XACT_ABORT ON " 
    + "BEGIN TRANSACTION "
    +"INSERT INTO Claims VALUES(@id, @total_amount, '"+formCreator+"', @expense_type, "
      + "@levels, @claimees, @status, @sd, @ad, @pd, @lsd, @lad, @lpd, @cd);"
      + "INSERT INTO MonthlyGeneral VALUES(@formid , @fromDate, @toDate, @costCenter, @note);"
      + " COMMIT TRANSACTION";
        
    request.input('id', sql.Int, newFormId);
    request.input('expense_type', sql.Text, expenseType)
    request.input('total_amount', sql.Numeric, 0);
    request.input('levels', sql.Int, 1);
    request.input('claimees', sql.Int, 1);
    request.input('status', sql.VarChar, "In Progress");
    request.input('sd', sql.DateTime, null);
    request.input('ad', sql.DateTime, null);
    request.input('pd', sql.DateTime, null);
    request.input('lsd', sql.DateTime, null);
    request.input('lad', sql.DateTime, null);
    request.input('lpd', sql.DateTime, null);
    request.input('cd', sql.DateTime, result.recordset[0].currentDateTime);
    request.input('formid', sql.Int, newFormId);
    request.input('fromDate', sql.Date, fromDate.recordset[0].fromDate);
    request.input('toDate', sql.Date, toDate.recordset[0].toDate);
    request.input('costCenter', sql.VarChar, costCenter)
    request.input('note', sql.Text, note);

    await request.query(query);
  
    res.send({message: "Monthly claim added successfully!", user: formCreator});
        
  } catch(err) {
    console.log(err)
    res.send({message: "Failed to add claim!"});
  }

} else {

  try {
  
    let country = req.body.country;
    let exchangeRate = req.body.exchangeRate;
    let dateFrom = req.body.dateFrom;
    let dateTo = req.body.dateTo;

    var request = new sql.Request();

    const result = await request.query("SELECT GETDATE() AS currentDateTime, COUNT(*) AS count FROM Claims")
    const newFormId = result.recordset[0].count + 1;
    const fromDate = await request.query("SELECT PARSE('"+dateFrom+"' as date USING 'AR-LB') AS fromDate")
    const toDate = await request.query("SELECT PARSE('"+dateTo+"' as date USING 'AR-LB') AS toDate") 
    
    const query = "SET XACT_ABORT ON BEGIN TRANSACTION " 
    + "INSERT INTO TravellingGeneral VALUES(@country, @exchangerate, @period_from, @period_to, @note, @formid);"
    " INSERT INTO Claims VALUES(@id, @total_amount, '"+formCreator+"', @expense_type, "
      + "@levels, @claimees, @status, @sd, @ad, @pd, @lsd, @lad, @lpd, @cd); COMMIT TRANSACTION";
        
    request.input('id', sql.Int, newFormId);
    request.input('expense_type', sql.Text, expenseType)
    request.input('total_amount', sql.Numeric, 0);
    request.input('levels', sql.Int, 1);
    request.input('claimees', sql.Int, 1);
    request.input('status', sql.VarChar, "In Progress");
    request.input('sd', sql.DateTime, null);
    request.input('ad', sql.DateTime, null);
    request.input('pd', sql.DateTime, null);
    request.input('lsd', sql.DateTime, null);
    request.input('lad', sql.DateTime, null);
    request.input('lpd', sql.DateTime, null);
    request.input('cd', sql.DateTime, result.recordset[0].currentDateTime);
    request.input('country', sql.VarChar, country);
    request.input('exchangerate', sql.Numeric, exchangeRate);
    request.input('period_from', sql.Date, fromDate.recordset[0].fromDate);
    request.input('period_to', sql.Date, toDate.recordset[0].toDate);
    request.input('note', sql.Text, note);
    request.input('formid', sql.Int, newFormId);

    await request.query(query);

    res.send({message: "Travelling claim added successfully!", user: formCreator});

  } catch(err) {
      console.log(err)
      res.send({message: "Failed to add travelling claim!"});
  }

  }
});

app.post('/joinClaim', async (req, res) => {
  let formId = req.body.formId;
  let formCreator = req.body.creator;

  try {
    var request = new sql.Request();
    
    //handles case where form creator joins claim as it will throw error
    await request.query("INSERT INTO Claimees VALUES('"+formId+"', '"+formCreator+"' )");

    res.send({message: "Joined claim successfully!", user: formCreator})

  } catch(err) {
    console.log(err)
    res.send({message: "Failed to join claim!"});
  }

});

