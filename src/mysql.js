const mysql = require('mysql2');
const dbconfig = require('./config/db.config');

const content = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'file',
    port: '3306'
});

content.connect((error) => {
    if(error) 
        throw error;
});

const querysql = "select * from filetest";

content.query(querysql, (error, results, fileds)=> {
    if(error) {
        throw error;
    }
    console.log(results);
});