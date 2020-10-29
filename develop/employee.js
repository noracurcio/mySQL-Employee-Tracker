const mysql = require("mysql");
const inquirer = require("inquirer");
// const config = require("./config.json")

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

function role(){
    // console.log("testing")
    connection.query("SELECT * FROM role", function(err, result){
        if(err) throw err
        // console.log("testing")
        console.table(result)
    })

}
function department(){
    // console.log("testing")
    connection.query("SELECT * FROM department", function(err, result){
        if(err) throw err
        // console.log("testing")
        console.table(result)
    })

}
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

function updateRole() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM role", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
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
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].title === answer.choice) {
              chosenItem = results[i];
            }
          }
          // determine if bid was high enough
       
            // bid was high enough, so update db, let the user know, and start over
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
     
         
            // bid wasn't high enough, so apologize and start over
            
        });
    });
  }



// async function employee(){
//     const view = await db.employee()
//     console.table(view);
//     init();
// }

// async function role(){
//     const view = await db.employee()
//     console.table(view);
//     init();
// }

// async function department(){
//     const view = await db.department()
//     console.table(view);
//     init();
// }

// async function department(){
//     const view = await db.department()
//     console.table(view);
//     init();
// }

// async function addEmployee(){
//     return (inquirer.prompt ([
//         {
//             type: "input",
//             message: "Please enter a first name",
//             name: "firstname"
//           },
//           {
//             type: "input",
//             message: "Please enter a last name",
//             name: "lastname"
//           },
//           {
//             type: "input",
//             message: "Please enter your role number",
//             name: "role"
//           },
//           {
//             type: "input",
//             message: "Please enter your managers ID",
//             name: "managerid"
//           }
//         ])
//         .then(answers => {
//           const data = 
//            {
//             first_name: answers.firstname, 
//             last_name: answers.lastname, 
//             role_id: answers.role, 
//             manager_id: answers.managerid
//           } 
//            db.addEmployee(data);
//           console.log("Employee added")
//           init();
//         })
//         )
//       }


//       function addRole(){
//         return (inquirer.prompt ([
//           {
//             type: "input",
//             message: "Please enter a role title",
//             name: "title"
//           },
//           {
//             type: "input",
//             message: "Please enter a salary for this role",
//             name: "salary"
//           },
//           {
//             type: "input",
//             message: "Enter a department ID?",
//             name: "department",
//           }
       









// // init();