const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ankasa'
})

connection.connect((err) => {
    if(!err) {
        console.log('MySQL Connected')
    } else {
        console.log(err)
    }
})

module.exports = connection