const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

// simple query
db.query(
    `SELECT * FROM employees`,
    function(err, rows) {
      console.table(rows); // results contains rows returned by server
    }
);
  

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

    


