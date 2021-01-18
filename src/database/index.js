const mysql = require('mysql');
const config = require('./config');
const pool = mysql.createPool(config.mysql);

pool.getConnection(function(error, connection) {
    if (error) throw error; // not connected!
    console.log(`Connected to database: ${connection.config.database}`);

    if (config.table) {
        pool.query(config.table, function (error, result) {
            if (error) throw error;
            console.log("Table created");
        });
    }
});

function addDatabaseUser(nome, sobrenome, idade, cidade, estado) {
    return new Promise((resolve, reject) => {
        pool.query({
            sql: 'INSERT INTO users (nome, sobrenome, idade, cidade, estado) VALUES(?, ?, ?, ?, ?)',
            timeout: 40000, // 40s,
            values: [nome, sobrenome, idade, cidade, estado]
        }, function(error, result, fields) {
            if (error) reject(error);
                
            return resolve(result);
        });
    });
}

function updateDatabaseUser(id, payload) {
    console.log("Call in updateDatabaseUser")
    let sets = ""
    for (let key in payload.update) {
        if (sets) sets += ", "
        sets += `${key} = "${payload.update[key]}" `
    }
    return new Promise((resolve, reject) => {
        pool.query({
            sql: `UPDATE users set ${sets} WHERE user_id = ?`,
            timeout: 40000, // 40s,
            values: [id]
        }, function(error, result, fields) {
            if (error) reject(error);
                
            return resolve(result);
        });
    });
}

function deleteDatabaseUser(id) {
    return new Promise((resolve, reject) => {
        pool.query({
            sql: 'DELETE FROM users WHERE user_id = ?',
            timeout: 40000, // 40s,
            values: [id]
        }, function(error, result, fields) {
            if (error) reject(error);
                
            return resolve(result);
        });
    });
}

function selectDatabaseUser(id) {
    return new Promise((resolve, reject) => {
        pool.query({
            sql: 'SELECT * FROM users WHERE user_id = ?',
            timeout: 40000, // 40s,
            values: [id]
        }, function(error, result, fields) {
            if (error) reject(error);
                
            return resolve(result);
        });
    });
}

function getDatabaseAllUsers() {
    return new Promise((resolve, reject) => {
        pool.query({
            sql: 'SELECT * FROM users',
            timeout: 40000 // 40s,
        }, function(error, result, fields) {
            if (error) reject(error);
                
            return resolve(result);
        });
    });
}

module.exports = { addDatabaseUser, selectDatabaseUser, getDatabaseAllUsers, updateDatabaseUser, deleteDatabaseUser }