const express=require('express')
const { optionDelete, optionVote } = require('../controllers/optionController')
const router=express.Router()
router.get('/:id/delete',optionDelete )
router.post('/:id/add_vote',optionVote)
module.exports=router



