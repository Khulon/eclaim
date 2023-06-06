const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const app = express();
var async = require('async');

app.use(cors());
app.use(express.json({limit: '50mb'}));

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
  const query = "INSERT INTO Employees VALUES('"+email+"','"+name+"','"+company+"'," +
  "'"+isProcessor+"','"+isApprover+"','"+isSupervisor+"', @profile)"

  request.input('profile', sql.VarChar, null)
  await request.query(query)
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
  try {
    let email = req.body.companyEmail;
    let password = req.body.password;
    var request = new sql.Request();
    let statement = "SELECT COUNT(*) AS count FROM Accounts WHERE email = '"+email+"' and password = '"+password+"'";
    let checkAdmin = await request.query("SELECT COUNT(*) AS count FROM SystemAdmins WHERE email = '"+email+"' and password = '"+password+"'");
    let count = checkAdmin.recordset[0].count;

    //Admin login
    if (count == 1) {
      res.send({ email: email, userType: "Admin", message: "Login Successful!"});	

    } else {
      const result = await request.query(statement)
      let count = result.recordset[0].count;

      //Normal user login  
      if(count == 1) {
        var request = new sql.Request();
        
        const result = await request.query('SELECT DISTINCT E.email, name, company_prefix, processor, E.approver, supervisor, approver_name, password, '
        + 'processor_email, profile FROM Employees E JOIN BelongsToDepartments B ON E.email = B.email JOIN Approvers A ON A.department = B.department'
        + " JOIN Processors P ON E.company_prefix = P.company JOIN Accounts ON Accounts.email = E.email WHERE E.email = '"+email+"'");

        let records = result.recordset[0];

        res.send({userType: "Normal", image: records.profile, email: records.email, name: records.name,message: "Login Successful!", details: records});

      } else {
        res.json({message: "Login Failed!"});
      }
    }
} catch(err) {
    console.log(err)
    res.json({message: "Login Failed!"});
}
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

  //Adding monthly claim
  if (expenseType == "Monthly") {
  
  try {

    const result = await request.query("SELECT GETDATE() AS currentDateTime, COUNT(*) AS count, MAX(id) as id FROM Claims")

    if (result.recordset[0].count == 0) {
      var newFormId = 1;
    } else {
      var newFormId = result.recordset[0].id + 1;
    }
    
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
    request.input('total_amount', sql.Numeric(18,2), 0);
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

//Adding travelling claim
} else {

  try {
  
    let country = req.body.country;
    let exchangeRate = req.body.exchangeRate;
    let dateFrom = req.body.dateFrom;
    let dateTo = req.body.dateTo;

    var request = new sql.Request();

    const result = await request.query("SELECT GETDATE() AS currentDateTime, COUNT(*) AS count, MAX(id) as id FROM Claims")
    if (result.recordset[0].count == 0) {
      var newFormId = 1;
    } else {
      var newFormId = result.recordset[0].id + 1;
    }
    const fromDate = await request.query("SELECT PARSE('"+dateFrom+"' as date USING 'AR-LB') AS fromDate")
    const toDate = await request.query("SELECT PARSE('"+dateTo+"' as date USING 'AR-LB') AS toDate") 
    
    const query = "SET XACT_ABORT ON BEGIN TRANSACTION " 
    + " INSERT INTO Claims VALUES(@id, @total_amount, '"+formCreator+"', @expense_type, @levels, @claimees, @status, @sd, @ad, @pd, @lsd, @lad, @lpd, @cd);"
    + "INSERT INTO TravellingGeneral VALUES(@country, @exchangerate, @period_from, @period_to, @note, @formid); COMMIT TRANSACTION";
        
    request.input('id', sql.Int, newFormId);
    request.input('expense_type', sql.Text, expenseType)
    request.input('total_amount', sql.Numeric(18,2), 0);
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
    request.input('exchangerate', sql.Decimal(19,9), exchangeRate);
    request.input('period_from', sql.Date, fromDate.recordset[0].fromDate);
    request.input('period_to', sql.Date, toDate.recordset[0].toDate);
    request.input('note', sql.Text, note);
    request.input('formid', sql.Int, newFormId);

    console.log(query)
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



//Add or change profile photo
app.post('/uploadImage', async (req, res) => {
  try {
    let email = req.body.email;
    let image = req.body.image;


    var request = new sql.Request();
    await request.query("UPDATE Employees SET profile = '"+image+"' WHERE email = '"+email+"'");
    res.send({message: "Image updated successfully!"});


  } catch (err) {
    console.log(err)
    res.send({message: "Failed to upload image!"});
  }

});




//Load all user's claims on MyClaims page
app.get('/myClaims/:email', async (req, res) => {
  try {
    const { email } = req.params;
    var request = new sql.Request();
  
    const queryString = 'SELECT C.id, form_creator, total_amount, claimees, status, form_type, pay_period_from, pay_period_to,'
    + 'period_from, period_to FROM Claims C LEFT OUTER JOIN MonthlyGeneral M ON C.id = M.id LEFT OUTER JOIN TravellingGeneral T ON C.id = T.id' 
    + ' WHERE form_creator = @email';

    request.input('email', sql.VarChar, email);
    const result = await request.query(queryString);
    res.send(result.recordset);

  } catch(err) {
      console.log(err)
      res.send({message: "Error!"});
  }

});


//get expenses for claim
app.get('/getExpenses/:type/:id', async (req, res) => {
  const { id, type } = req.params;
  var request = new sql.Request();

try {
  if(type == 'Monthly') {

    const queryString = 'SELECT name, email, total_amount, expense_type, date_of_expense, item_number, checked FROM MonthlyExpenses M JOIN Employees E ON M.claimee = E.email WHERE id = @id';
    request.input('id', sql.Int, id);
    const result = await request.query(queryString);
    res.send(result.recordset);

  } else { 
    const queryString = 'SELECT name, email, amount, expense_type, date, item_number FROM TravellingExpenses T JOIN Employees E ON T.claimee = E.email WHERE id = @id';
    request.input('id', sql.Int, id);
    const result = await request.query(queryString);
    res.send(result.recordset);
  }
  
} catch(err) {
  console.log(err)
  res.send({message: "Error!"});
}

});


//Add travelling expense
app.post('/addTravellingExpense', async (req, res) => {
  let id = req.body.id;
  let claimee = req.body.claimee;
  let amount = req.body.amount;
  let type = req.body.type;
  let otherType = req.body.otherType;
  let receipt = req.body.receipt;

  try {

    if(type == "Others") {

      if(otherType == "") {
        otherType = null;
      }

      if(otherType == "Others") {
        throw new Error("Please enter a valid expense type!")
      }

      type = otherType;

    }

    let date = req.body.date;
    var description = req.body.description;

    if(description == "") {
      description = null;
    }

    
    var request = new sql.Request();
    const checkType = await request.query("SELECT COUNT(*) AS count FROM TravellingExpenseTypes WHERE type = '"+type+"'")
    if(checkType.recordset[0].count == 0) {
      const query = "INSERT INTO TravellingExpenseTypes VALUES(@type)"
      request.input('type', sql.VarChar, type)
      await request.query(query);
    }
    const count = await request.query("SELECT COUNT(*) AS count FROM TravellingExpenses WHERE id = '"+id+"' AND claimee = '"+claimee+"'")
    let item_number = count.recordset[0].count + 1;
    const currentTime = await request.query("SELECT GETDATE() AS currentDateTime")
    const expense_date = await request.query("SELECT PARSE('"+date+"' as date USING 'AR-LB') AS date")
    const query = ("INSERT INTO TravellingExpenses VALUES(@id, '"+claimee+"', @count, '"+type+"', @date, @description, '"+receipt+"', @amount, @da, @lm )");
    request.input('id', sql.Int, id)
    request.input('count', sql.Int, item_number);
    request.input('date', sql.Date, expense_date.recordset[0].date)
    request.input('description', sql.Text, description);
    request.input('amount', sql.Numeric(18,2), amount);
    request.input('da', sql.DateTime, currentTime.recordset[0].currentDateTime);
    request.input('lm', sql.DateTime, currentTime.recordset[0].currentDateTime);


    await request.query(query);

    res.send({message: "Success!"});
  } catch(err) {
    console.log(err)
    res.send({message: "Failed to add travelling expense!"});
  }

});



app.get('/getTravellingExpenseTypes', async (req, res) => {
  try {
    var request = new sql.Request();
    const result = await request.query("SELECT * FROM TravellingExpenseTypes");
    res.send(result.recordset);
  } catch(err) {
    console.log(err)
    res.send({message: "Error!"});
  }

});