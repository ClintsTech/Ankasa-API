const router = require('express').Router()
const chatController = require('../controllers/chat')

router
    .get('/last-message', chatController.getLastMessage)
module.exports = router