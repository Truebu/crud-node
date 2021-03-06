const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

connection.connect((err)=>{
    if(err) throw err;
    console.log('Success connection');
});

module.exports = connection;