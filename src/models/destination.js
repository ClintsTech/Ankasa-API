const db = require('../config/mysql')

module.exports={
    getDestination: function(setData) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email='${setData.email}'`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}