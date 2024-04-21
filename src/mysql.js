const express = require('express');
const mysql = require('mysql2');
const dbconfig = require('./config/db.config');
const bodyParser = require('body-parser');
const querystring = require("querystring");

const sqlRoute = express.Router();
sqlRoute.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'file',
    port: '3306'
});

connection.connect((error) => {
    if(error) 
        throw error;
});

sqlRoute.get('/all', function (req, res) {
    try {
        const querysql = "select * from filetest";
    
        connection.query(querysql, (error, results, fileds)=> {
            if(error) {
                throw error;
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ message: 'Error get file in mysql' });
    }
})

sqlRoute.get('/:index', (req, res) => {
    const params = req.params
    const sql = 'select * from filetest where fileId = ?'
    const where_value = [params.index];

    connection.query(sql, where_value, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        res.send(result)
    });
})

sqlRoute.post('/add', (req, res) => {
    try { 
        const reqbody = req.body;

        const sql = 'insert into filetest set fileId=? , fileName=? , fileContent=?';
        const add_value = [reqbody.fileId, reqbody.fileName, reqbody.fileContent];
        connection.query(sql, add_value, function (err, result) {
            if(err) {
                console.log('add failed');
                return res.status(500).json({ message: 'add failed' });
            }
            res.status(200).send({message: 'add success'})
        });
    } catch (error) {
        res.status(500).json({ message: 'Error create file in mysql' });
    }
})

sqlRoute.put('/update', function (req, res) {
    try {
        let update = '';
        req.on('data', function (chunk) {
            update += chunk;
            console.log(update)
        });
    
        req.on('end', function () {
            update = querystring.parse(update);
            let sql = 'update filetest set fileName=?, fileContent=? where fileId=?';
            let update_value = [update.fileName, update.fileContent, update.id];
    
            connection.query(sql, update_value, function (err, result) {
                if (err) {
                    console.log('update failed', err.message);
                }
                res.send('update success')
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error update file in mysql' });
    }
})

sqlRoute.delete('/delete', function (req, res) {
    try {
        let params = req.query;
        let sql = 'delete from filetest where fileId= ?';
        let where_value = [params.fileId];
    
        connection.query(sql, where_value, function (err, result) {
            if (err) {
                console.log('delete failed', err.message);
            }
            res.send('delete success')
        });
    } catch (error) {
        res.status(500).json({ message: 'Error delete file in mysql' });
    }
})

module.exports = sqlRoute;