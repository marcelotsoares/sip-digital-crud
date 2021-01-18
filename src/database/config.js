module.exports = {
    mysql: {
        connectionLimit : 10,
        host: '127.0.0.1',
        user : 'root',
        password: '',
        database: 'sip_digital'
    },
    table: `CREATE TABLE IF NOT EXISTS users(
        user_id INT(11) NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        sobrenome VARCHAR(255) NOT NULL,
        idade int(2) NOT NULL,
        cidade VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL,
        PRIMARY KEY (user_id) 
      );
    `
}