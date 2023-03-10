// import express
const { request, response } = require('express')
let express = require('express')

// create express app
let app = express()
let mongoose = require('mongoose')
let song = require('./song')

// enable express to work with json type request body
app.use(express.json())

let PORT = 8989


// setup connection string
let connectionstring = "mongodb+srv://soenfahyap:s3renity125493@cluster0.rtjrgpm.mongodb.net/myyoutube"

mongoose.connect(connectionstring)
let db = mongoose.connection


// check if connection to mongodb database is sucessful

db.once('open', ()=>{
    console.log("connected to mongodb database in cloud!")
})


// create first api -> root end point -> /
// https://localhost:8888/
/* 
GET -> just retrieve the data
PUT -> update
POST -> add new
DELETE -> delete data
 */

// Post request handlr for /
app.get("/", (request, response) =>{
    console.log('Requeste received')
    console.log("GET")
    console.log(request.url)
    response.send("Hello from express API")
})

// get requeset handle for /welcome
app.get("/welcome", (request, response)=>{
    console.log("request received")
    console.log("GET")
    console.log(request.url)
    response.send("<h1> Welceome to express apui</h1>")
})


app.listen(PORT, ()=>{
    console.log("Listnening on port " + PORT)
})

app.post("/", (request, response)=>{
    console.log("request received")
    console.log('POST')
    console.log(request.url)
    response.send("<h1> Hello post from express api</h1>")
})


// put request handle for /welcome
app.put("/welcome", (request, response)=>{
    console.log("request received")
    console.log("PUT")
    console.log(request.url)
    response.send("<h1> Put request </h1>")
})

//Post request handler 
app.post("/add/friend",(request, response)=>{
    console.log("request received")
    console.log(request.url)
    
    // Read trhe request body received along 
    console.log(request.body)
    response.json({
        "status":"Success"
    })
})



//Post request handler 
app.post("/add/song",(request, response)=>{
    console.log("request received")
    console.log(request.url)
    
    // Read trhe request body received along 
    console.log(request.body)
    let newSong = new song()
    console.log(newSong)

    // transfer values from request.body to newSong instance
    newSong.videoid = request.body.videoid
    newSong.likes = request.body.likes
    newSong.views = request.body.views
    console.log(newSong);
    // save the newSPmg on mongodb database
    newSong.save()
        .then((data)=>{
            response.json({
                "status":"successs",
                "saved":data
            })
        })
        .catch((error)=>{
            console.log(error)
            response.error(error)
        })

    // response.json({
    //     "status":"Success"
    // })
})

// connection to mongodb and receive the list of documents from songs collection

app.get("/get/song", (request,response)=>{
    console.log("request received get");
    console.log(request.url)
    // connect to mongodb to get all documents
    song.find({})
    .then((data)=>{
        response.json()
    })
    .catch((error)=>{
        response.json(error)
    })
})

// get song by id
app.get("/get/song/:myid", (request, response)=>{
    console.log(request.params.myid)
    song.findById(
        request.params.myid
    )
    .then((data)=>{
        response.json(data)
    })
    .catch((error)=>{
        response.json(error)
    })
})
