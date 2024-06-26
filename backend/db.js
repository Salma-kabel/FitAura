const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'fitaura_user',
    password: 'P@ssw0rd',  // Replace with your new user's password
    database: 'fitAura_DB'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;



