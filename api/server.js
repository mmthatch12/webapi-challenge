const express = require('express');

const actionRouter = require('../data/helpers/actionRouter')
const projectRouter = require('../data/helpers/projectRouter')

const server = express()

server.use(express.json())

server.use('/action', actionRouter)
server.use('/project', projectRouter)





server.get('/', (req, res) => {
    res.send(`<h1>Sanity check<h1>`)
})


module.exports = server