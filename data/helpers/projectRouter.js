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

router.get('/:id', (req, res) => {
    const id = req.params.id

   
    projectDB.get(id)
        .then(project => {
            if(project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({ message: "Project Id does not exist" })
            }
            
        })
        .catch(error => {
            res.status(500).json({ error: "Could not load project"})
        })
        
})










module.exports = router;