const db = require('../config/mysql')

module.exports={
    getAirlines: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM airlines`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    createAirlines: function(setData) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO airlines SET ?', setData, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateAirlines: function(id,setData) {
        // console.log(setData, id)
        return new Promise((resolve, reject) => {
            db.query(`UPDATE airlines SET ? WHERE id=${id}`, setData, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    deleteAirlines: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM airlines WHERE id=${id}`, (err, res) => {
                if(!err) {
                    resolve(res)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

}