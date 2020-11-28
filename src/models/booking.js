const db = require('../config/mysql')

module.exports={
    getBooking: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM booking`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    createBooking: function(setData) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO booking SET ?', setData, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateBooking: function(id,setData) {
        // console.log(setData, id)
        return new Promise((resolve, reject) => {
            db.query(`UPDATE booking SET ? WHERE id=${id}`, setData, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteBooking: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM booking WHERE id=${id}`, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

}