const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000

app.use(routes)

app.get('/', function (req, res) {
	res.send('OK')
})


app.listen(port, function () {
	console.log(`application is listening on port ${port}...`)
})

module.exports = app