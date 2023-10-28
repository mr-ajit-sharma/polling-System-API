const mongoose=require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO)
const db=mongoose.connection
db.on('error',()=>{
    console.log("error in db connection")
})
db.once('open',()=>{
    console.log("server is connected to the database")
})
module.exports=db