const express = require("express")
const app = express()
const PORT = 3001

const fs = require("fs")
const path = require("path")
const cors = require("cors")
const pathToFile = path.resolve("./data.json")

const getResouces = ()=>  JSON.parse(fs.readFileSync(pathToFile))

// Enable CORS for localhost:3000
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))
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