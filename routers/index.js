const express=require('express')
const router=express.Router()
router.use('/question',require('./question'))
router.use('/option',require('./option'))
module.exports=router