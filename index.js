//Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
//MySql Database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '2i8w8j4e2t5y7b7r6Q!@',
        database: 'Employee_Tracker_db'
    }
);
//Prompts
const prompts = [{
    type: 'list',
    name: 'main',
    message: 'What would you like to do? (use arrow keys)',
    choices: ["View All Departments", "View All Roles",
        "View All Employees", "Add A Department", "Add A Role",
        "Add An Employee", "Update An Employee Role", "Exit"],
}, {
    type: 'input',
    name: 'department',
    message: 'Enter a department name: ',
}];
//View all departments
viewAllDepartments = () => {
    db.query('SELECT d.id AS ID, d.department_name AS Department FROM departments d', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
//View all roles
viewAllRoles = () => {
    db.query('SELECT r.id AS ID, r.title AS Role, r.salary AS Salary, d.department_name AS Department FROM employee_roles r JOIN departments d ON r.department_id = d.id',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
}
//View all employees
viewAllEmployees = () => {
    db.query('SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, er.title AS Title, e.manager_id AS Supervisor_ID FROM employees e JOIN employee_roles er ON e.role_id = er.id',
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
}
//Add a department
addDepartment = () => {
    inquirer
    .prompt([prompts[1]])
    .then((data) =>{
        db.query(`INSERT INTO departments (department_name) VALUES (${data.department})`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    })
    
}
//Add a role
addRole = () => {
    db.query('', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
//Add an employee
addEmployee = () => {
    db.query('', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
//Update an employee role
updateEmployeeRole = () => {
    db.query('', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
//Start prompt
mainPrompt = async () => {
    inquirer
        .prompt([
            prompts[0],
        ])
        .then((data) => {
            console.log(data);
            try {
                switch (data.main) {
                    case "View All Departments":
                        viewAllDepartments();
                        mainPrompt();
                        break;
                    case "View All Roles":
                        viewAllRoles();
                        mainPrompt();
                        break;
                    case "View All Employees":
                        viewAllEmployees();
                        mainPrompt();
                        break;
                    case "Add A Department":
                        addDepartment();
                        //mainPrompt();
                        break;
                    case "Add A Role":
                        addRole();
                        mainPrompt();
                        break;
                    case "Add An Employee":
                        addEmployee();
                        mainPrompt();
                        break;
                    case "Update An Employee Role":
                        updateEmployeeRole();
                        mainPrompt();
                        break;
                    case "Exit":
                        break;
                    default:
                        // Invalid selection
                        console.log('Invalid selection');
                        break;
                }
            }
            catch (err) {
                console.log("Error: ", err);
            }

        });
}

mainPrompt();


