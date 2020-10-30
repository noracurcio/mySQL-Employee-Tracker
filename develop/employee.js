const mysql = require("mysql");
const inquirer = require("inquirer");
var figlet = require('figlet');

//connection


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Icuryy4me!",
    database: "employeeDB"
})
connection.connect(function(err){
    if(err) throw err 
    init()
})

//figlet thing
var figlet = require('figlet');
figlet('EMPLOYEE MANAGER', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log("\n============================")
    console.log(data)
    console.log("\n============================\n\n\n\n\n\n")
});


//funtion to run through initial question
function init(){
  inquirer.prompt (
    {
      type: "list",
      name: "search",
      message: "What would you like to do?",
      choices: [        
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add Employee",
      "Add Role",
      "Update Employee's Role",
      "Exit"]
    }
  
  )

  //switch statement to run through every option
  .then(function(res){
      switch (res.search){
        case "View All Employees":
              employee();
              break;
        case "View All Roles":
            role();
            break;
        case "View All Departments":
            department();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Add Role":
            addRole();
            break;
        case "Update Employee's Role":
            updateRole();
            break;
        default:
            process.exit();

      }

  });
}

//view employees function

function employee(){
    // console.log("testing")
    connection.query("SELECT * FROM employee", function(err, result){
        if(err) throw err
        // console.log("testing")
        console.table(result)
    })
    
}


//view roles function
function role(){
    // console.log("testing")
    connection.query("SELECT * FROM role", function(err, result){
        if(err) throw err
        // console.log("testing")
        console.table(result)
    })

}
// view dept function
function department(){
    // console.log("testing")
    connection.query("SELECT * FROM department", function(err, result){
        if(err) throw err
        // console.log("testing")
        console.table(result)
    })

}

//add role function
function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: "empRole",
            message: "Please enter a role."

        },
        {
            type: "input",
            name: "empSalary",
            message: "Please enter a salary."

        },
        {
            type: "input",
            name: "deptId",
            message: "Please enter a department ID."

        }

    ]).then(answers =>{
        connection.query("INSERT INTO role SET ?", 
        {
            title:answers.empRole,
            salary:answers.empSalary,
            department_id:answers.deptId,
        },
        function(err){
            if(err) throw err;
            console.log("Created role successfully!");
            init();
        }
        )
    })
    
    
}

//add employee function
function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "empFirst",
            message: "What is the new employee's first name?."

        },
        {
            type: "input",
            name: "empLast",
            message: "What is the new employees last name?"

        },
        {
            type: "input",
            name: "newRoleID",
            message: "What is the role ID?."

        },
        {
            type: "input",
            name: "newRoleManID",
            message: "What is the new employee's manager ID?"

        }

    ]).then(answers =>{
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name:answers.empFirst,
            last_name:answers.empLast,
            role_id:answers.newRoleID,
            manager_id:answers.newRoleManID
        },
        function(err){
            if(err) throw err;
            console.log("Employee added successfully!");
            init();
        }
        )
    })
    
    
}

//update role function
function updateRole() {
    
    connection.query("SELECT * FROM role", function(err, results) {
      if (err) throw err;
      
      inquirer
        .prompt([
          {
            name: "choice",
            type: "list",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }
              return choiceArray;
            },
            message: "What role would you like to update?"
          },
          {
            name: "empId",
            type: "input",
            message: "What is the ID of the employee you want to update?"
          }
        ])
        .then(function(answer) {
          
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].title === answer.choice) {
              chosenItem = results[i];
            }
          }
         
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  role_id:chosenItem.id
                },
                {
                  id: answer.empId
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Role updated successfully!");
                init();
              }
            );  
        });
    });
  }


