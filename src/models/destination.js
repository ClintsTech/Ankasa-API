const db = require('../config/mysql')

module.exports={
    getDestination: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM top_destination`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    createDestination: function(setData) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO top_destination SET ?', setData, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateDestination: function(id,setData) {
        console.log(setData, id)
        return new Promise((resolve, reject) => {
            db.query(`UPDATE top_destination SET ? WHERE id=${id}`, setData, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteDestination: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM top_destination WHERE id=${id}`, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

}