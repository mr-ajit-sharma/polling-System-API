const express=require('express')
const port=8000;
const mongoose=require('mongoose')
const app=express()

// db configuration
mongoose.connect('mongodb://0.0.0.0:27017/pollPract')
const db=mongoose.connection
db.on('error',()=>{
    console.log("error in db connection")
})
db.once('open',()=>{
    console.log("server is connected to the database")
})


// routing configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',require('./routers/index'))

// listening to the port
app.listen(port,()=>{
    console.log(`server is connected on the port ${port} `)
})