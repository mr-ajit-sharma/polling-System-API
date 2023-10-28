const express=require('express')
const port=process.env.PORT || 8000;
const app=express()

// db configuration
const db=require('./configs/mongoose')


// routing configuration
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',require('./routers/index'))


// listening to the port
app.listen(port,()=>{
    console.log(`server is connected on the port ${port} `)
})