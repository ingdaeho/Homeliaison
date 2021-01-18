const express = require('express')
const router = express.Router()
const { ParsingController } = require('../controllers')

router.post('/', ParsingController.parseAddress)

module.exports = router