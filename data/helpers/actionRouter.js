const express = require('express');

const router = express.Router();

const actionDB = require('./actionModel')

router.get('/', (req, res) => {
    actionDB.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load projects"})
        })
})

router.get('/:id', validateActionId, (req, res) => {
    const id = req.params.id

    actionDB.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load projects"})
        })
})


//Some custom middleware

function validateActionId(req, res, next) {
    const id = req.params.id

    actionDB.get(id)
        .then(action => {
            if(action) {
                next()
            } else {
                res.status(400).json({ message: "invalid action id" })
              }
        })

};








module.exports = router;