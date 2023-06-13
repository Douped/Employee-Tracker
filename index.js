//Notes
//Should be refactored
//Add error checking for empty entry fields
//Modify the way data is displayed/when the mainprompt is called again

//Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
//MySql Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2i8w8j4e2t5y7b7r6Q!@",
  database: "Employee_Tracker_db",
});
//Prompts
const prompts = [
  {
    type: "list",
    name: "main",
    message: "What would you like to do? (use arrow keys)",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Update An Employee Role",
      "Exit",
    ],
  },
  {
    type: "input",
    name: "department",
    message: "Enter a department name: ",
  },
  {
    type: "input",
    name: "role",
    message: "Enter a role name: ",
  },
  {
    type: "input",
    name: "salary",
    message: "Enter a salary for the role: ",
  },
  {
    type: "input",
    name: "department_id",
    message: "Enter the department ID to add the role to: ",
  },
  {
    type: "input",
    name: "first_name",
    message: "Enter the employees first name: ",
  },
  {
    type: "input",
    name: "last_name",
    message: "Enter the employees last name: ",
  },
  {
    type: "input",
    name: "role_id",
    message:
      "Enter the ID of the role to assign the employee to (leave empty if unknown): ",
  },
  {
    type: "input",
    name: "manager_id",
    message:
      "Enter the ID of the manager to assign to the employee (leave empty if unknown): ",
  },
  {
    type: "input",
    name: "employee_id",
    message:
      "Enter the ID of the employee whose role you would like to modify: ",
  },
];
//View all departments
viewAllDepartments = () => {
  db.query(
    "SELECT d.id AS ID, d.department_name AS Department FROM departments d",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        mainPrompt();
      }
    }
  );
};
//View all roles
viewAllRoles = () => {
  db.query(
    "SELECT r.id AS ID, r.title AS Role, r.salary AS Salary, d.department_name AS Department FROM employee_roles r JOIN departments d ON r.department_id = d.id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        mainPrompt();
      }
    }
  );
};
//View all employees
viewAllEmployees = () => {
  //how do i refactor this to display the department the employee works in ? (double join)
  db.query(
    "SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, er.title AS Job_Title, e.manager_id AS Supervisor_ID FROM employees e JOIN employee_roles er ON e.role_id = er.id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        mainPrompt();
      }
    }
  );
};
//Add a department
addDepartment = () => {
  inquirer.prompt([prompts[1]]).then((data) => {
    db.query(
      "INSERT INTO departments (department_name) VALUES (?)",
      data.department,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added ${data.department} to departments list.`);
          mainPrompt();
        }
      }
    );
  });
};
//Add a role
//Refactor to take a department name instead of an id and then check the department name with all other department names in the system and
//add the department if the department doesn't exist.
addRole = () => {
  inquirer.prompt([prompts[2], prompts[3], prompts[4]]).then((data) => {
    db.query(
      "INSERT INTO employee_roles (title, salary, department_id) VALUES (?, ?, ?)",
      [data.role, data.salary, data.department_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added ${data.role} to roles list.`);
          mainPrompt();
        }
      }
    );
  });
};
//Add an employee
addEmployee = () => {
  inquirer
    .prompt([prompts[5], prompts[6], prompts[7], prompts[8]])
    .then((data) => {
      if (data.role_id == "") {
        //if no role is specified, set the role to intern
        data.role_id = 2;
      }
      if (data.manager_id == "") {
        data.manager_id = null;
      }
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [data.first_name, data.last_name, data.role_id, data.manager_id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Added ${data.first_name} to employees list.`);
            mainPrompt();
          }
        }
      );
    });
};
//Update an employees role
//Refactor to prompt user to select the employee from a LIST of employees and then
updateEmployeeRole = () => {
  inquirer.prompt([prompts[9], prompts[7]]).then((data) => {
    db.query(
      "UPDATE employees SET role_id = ? WHERE id = ?",
      [data.role_id, data.employee_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Updated employees role.`);
          mainPrompt();
        }
      }
    );
  });
};
//Start prompt
mainPrompt = async () => {
  inquirer.prompt([prompts[0]]).then((data) => {
    try {
      switch (data.main) {
        case "View All Departments":
          viewAllDepartments();

          break;
        case "View All Roles":
          viewAllRoles();

          break;
        case "View All Employees":
          viewAllEmployees();

          break;
        case "Add A Department":
          addDepartment();

          break;
        case "Add A Role":
          addRole();

          break;
        case "Add An Employee":
          addEmployee();

          break;
        case "Update An Employee Role":
          updateEmployeeRole();

          break;
        case "Exit":
          break;
        default:
          // Invalid selection
          console.log("Invalid selection");
          break;
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  });
};

mainPrompt();
