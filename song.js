// create a song model
// it is mapped to songs colleciton

let mongoose = require('mongoose')


// use mongoose to initialize schema
let mongoSchema = mongoose.Schema

// let PORT = 8989


// use mongoSchema to reference song collection in mongoDb Database
let songSchema = new mongoSchema({
    
        "videoid": String,
        "likes": Number,
        "views": Number
      
}, {collection:"songs"})

// export the model
module.exports = mongoose.model('song', songSchema)