const db = require('../config/mysql')

module.exports = {
    getAllMessage: function(id) {
        // console.log(id)
        return new Promise((resolve, reject) => {
            db.query(`SELECT id, id_from, id_to, message, DATE_FORMAT(sending_time, '%H:%i') time FROM chat WHERE id_from=${id} OR id_to=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getLastMessage: function() {
        return new Promise((resolve, reject) => {
            db.query(`SELECT u.id,u.photo, u.name, c.message, DATE_FORMAT(c.sending_time, '%H:%i') time FROM users u LEFT JOIN chat c ON u.id = c.id_from OR u.id =c.id_to GROUP BY name`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postMessage: function (setData){
        return new Promise((resolve, reject)=>{
            db.query(`INSERT INTO chat SET ?`, setData, (err, res)=>{
                if(!err){
                    resolve(res)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}