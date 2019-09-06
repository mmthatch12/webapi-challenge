const express = require('express');

const router = express.Router();

const projectDB = require('./projectModel')

router.get('/', (req, res) => {
    projectDB.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load projects"})
        })
})








module.exports = router;