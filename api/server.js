// BUILD YOUR SERVER HERE
const express = require("express")
const modelFx = require("./users/model")

const server = express()

server.use(express.json())

server.post("/api/users", async (req,res) => {
    try{
        const {name, bio} = req.body
        const payload = await modelFx.insert({name, bio})
        if (!payload.name || !payload.bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            res.status(201).json(payload)
        }
    } catch(error) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.get("/api/users", async (req,res) => {
    try{
        const payload = await modelFx.find()
        res.status(200).json(payload)
    } catch(error) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
})

server.get("/api/users/:id", async (req,res) => {
    try {
        const {id} = req.params
        const payload = await modelFx.findById(id)
        if (!payload) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(payload)
        }
    } catch(error) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

server.delete("/api/users/:id", async (req,res) => {
    try {
        const {id} = req.params
        const payload = await modelFx.remove(id)
        if(!payload) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(payload)
        }
    } catch(error) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})

server.put("/api/users/:id", async (req,res) => {
    try {
        const {id} = req.params
        const {name, bio} = req.body
        const payload = await modelFx.update(id, {name, bio})
        if (!payload){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else { 
            if (!payload.name || !payload.bio) {
                res.status(400).json({ message: "Please provide name and bio for the user" })
            } else {
                res.status(200).json(payload)
            }
        }
    } catch(error) {
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
