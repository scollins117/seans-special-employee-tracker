const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'DogHouseCatTree117',
      database: 'employees_db'
    },
    console.log('Connected to the employees database.')
);

module.exports = db;