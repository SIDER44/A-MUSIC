const express = require("express")
const axios = require("axios")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static("public"))

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"views/index.html"))
})

/* SEARCH SONGS */

app.get("/api/search", async (req,res)=>{

let q = req.query.q

try{

let response = await axios.get(
`https://itunes.apple.com/search?term=${q}&entity=song&limit=20`
)

res.json(response.data.results)

}catch(e){

res.json({error:"API failed"})

}

})

/* TRENDING */

app.get("/api/trending", async (req,res)=>{

try{

let response = await axios.get(
"https://api.deezer.com/chart"
)

res.json(response.data.tracks.data)

}catch(e){

res.json({error:"failed"})

}

})

/* ARTIST */

app.get("/api/artist/:name", async (req,res)=>{

let name = req.params.name

try{

let response = await axios.get(
`https://itunes.apple.com/search?term=${name}&entity=song&limit=10`
)

res.json(response.data.results)

}catch(e){

res.json({error:"artist failed"})

}

})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log("A Music server running on port",PORT)
})
