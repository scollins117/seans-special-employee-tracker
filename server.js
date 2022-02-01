// require necessary packages
const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// provide user with list of options on startup
const startup = () => {
    inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role'
        ]
    })
    .then(function ({menu}) {
        switch (menu) {
            case 'View All Departments':
                viewDepartments();
            break;

            case 'View All Roles':
                viewRoles();
            break;

            case 'View All Employees':
                viewEmployees();
            break;

            case 'Add a Department':
                addDepartment();
            break;

            case 'Add a Role':
                addRole();
            break;

            case 'Add an Employee':
                addEmployee();
            break;

            case 'Update an Employee Role':
                updateEmployee();
            break;
        }
    })
}

// view all departments
const viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (err, rows) => {
        console.table(rows);
        startup();
    });
}

// view all roles
const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        console.table(rows);
        startup();
    });
}

// view all employees
const viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (err, rows) => {
        console.table(rows);
        startup();
    });
}

// add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'Enter Department Name'
        }
    ])
    .then(function(answer) {
        db.query(`INSERT INTO departments (department_name)
            VALUES ('${answer.department}')`, (err, res) => {
                if(err) throw err;
                console.log('Department ' + answer.department + ' added.');
                viewDepartments();
            })
    })
}

// add a role
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter Role Title'
        },
        {
            name: 'salary',
            type: 'number',
            message: 'Enter Role Salary'
        },
        {
            name: 'departmentID',
            type: 'number',
            message: 'Enter Department ID'
        }
    ])
    .then(function(answer) {
        db.query(`INSERT INTO roles (title, salary, department_id)
            VALUES ('${answer.title}', '${answer.salary}', '${answer.departmentID}')`, (err, res) => {
                if(err) throw err;
                console.log('Role Updated')
                viewRoles();
            })
    })
}

// add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Enter Employee First Name'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Enter Employee Last Name'
        },
        {
            name: 'roleID',
            type: 'number',
            message: 'Enter Role ID'
        },
        {
            name: 'managerID',
            type: 'number',
            message: 'Enter Employee Manager ID'
        }
    ])
    .then(function(answer) {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleID}', '${answer.managerID}')`, (err, res) => {
                if(err) throw err;
                console.log('Succes');
                // viewEmployees();
                viewEmployees();
            })
    })
}

// update an employees role
const updateEmployee = () => {
    inquirer.prompt([
        {
            name: 'employeeID',
            type: 'number',
            message: 'Enter ID of Employee You Want to Update'
        },
        {
            name: 'newRole',
            type: 'number',
            message: 'Enter Employee New Role ID'
        }        
    ])
    .then(function(answer) {
        db.query(`UPDATE employees SET role_id = '${answer.newRole}' WHERE id = '${answer.employeeID}'`, (err, res) => {
            if(err) throw err;
            console.log('Succes');
            // viewEmployees();
            viewEmployees();
        });
    })
}

startup();


    


