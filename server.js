const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// display all departments
db.query(`SELECT * FROM departments`, (err, rows) => {
  console.table(rows);
});

// display all roles
db.query(`SELECT * FROM roles`, (err, rows) => {
  console.table(rows);
});

// display all employees
db.query(`SELECT * FROM employees`, (err, rows) => {
  console.table(rows);
});

    


