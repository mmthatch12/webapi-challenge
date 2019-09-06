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






module.exports = router;