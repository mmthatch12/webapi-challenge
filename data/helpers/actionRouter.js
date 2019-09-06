const express = require('express');

const router = express.Router();

const actionDB = require('./actionModel')
const projectDB = require('./projectModel')

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

router.post('/:id', (req, res) => {
    const id = req.params.id
    const aBody = req.body

    projectDB.get(id)
        .then(project => {
            actionDB.insert(aBody)
                .then(action => {
                    res.status(200).json(action)
                })
                .catch(error => {
                    console.log(error)
                  return res.status(500).json({ error: "Action could not be added"})
                })
        })
})


router.put('/:id', validateActionId, (req, res) => {
    const id = req.params.id
    const aBody = req.body


    if(aBody.description && aBody.notes){
        actionDB.update(id, aBody)
            .then(action => {
                res.status(200).json(action)
            })
            .catch(error => {
                console.log(error)
              return res.status(500).json({ error: "action could not be updated"})
            })
    } else {
        return res.status(400).json({ message: "Notes and description are required" })
     } 
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