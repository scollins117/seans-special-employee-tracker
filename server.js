const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


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
        }
    })
}

const viewDepartments = () => {
    db.query(`SELECT * FROM departments`, (err, rows) => {
        console.table(rows);
    });
}

const viewRoles = () => {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        console.table(rows);
    });
}

const viewEmployees = () => {
    db.query(`SELECT * FROM employees`, (err, rows) => {
        console.table(rows);
    });
}

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
                console.log('Department' + answer.department + 'added.');
                viewDepartments();
            })
    })
}

startup();


    


