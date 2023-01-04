const express = require("express")
const app = express()
const PORT = 3001

const fs = require("fs")
const path = require("path")
const pathToFile = path.resolve("./data.json")

const getResouces = ()=>  JSON.parse(fs.readFileSync(pathToFile))

app.get("/", (req, res)=>{
    res.send("Hello World")
})

app.get("/api/resources", (req, res)=>{
    const resources = getResouces()
    res.send(resources)
})

app.listen(PORT, ()=>{
    console.log("Server is running on PORT " + PORT)
})