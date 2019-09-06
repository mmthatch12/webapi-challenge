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
              return  res.status(404).json({ message: "Project Id does not exist" })
            }
            
        })
        .catch(error => {
           return res.status(500).json({ error: "Could not load project"})
        })
        
})

router.post('/', (req, res) => {
    const pBody = req.body

    if(pBody.name && pBody.description){
        projectDB.insert(pBody)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error)
          return res.status(500).json({ error: "Project could not be added"})
        })
    } else {
       return res.status(400).json({ message: "Name and description are required" })
    }
    
})

router.update('/:id', (req, res) => {
    const id = req.params.id
    const pBody = req.body

    router.update(id, pBody)
        .then(project => {

        })
})

//Some custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id

    userDB.get(id)
        .then(project => {
            if(project) {
                next()
            } else {
                res.status(400).json({ message: "invalid project id" })
              }
        })

};








module.exports = router;