const express = require('express');
const cors = require('cors')

console.log('environment', process.env.NODE_ENV)

const actionRouter = require('../data/helpers/actionRouter')
const projectRouter = require('../data/helpers/projectRouter')

function logger(req, res, next) {
    console.log(`${req.method} to ${req.url} at [${new Date().toISOString()}] `)
  
    next()
  }

const server = express()

server.use(express.json())
server.use(cors())
server.use(logger)

server.use('/action', actionRouter)
server.use('/project', projectRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Sanity check<h1>`)
})

module.exports = server