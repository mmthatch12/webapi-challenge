const express = require('express');

const server = express()



server.get('/', (req, res) => {
    res.send(`<h1>Sanity check<h1>`)
})


module.exports = server