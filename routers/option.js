const express=require('express')
const { optionDelete,optionText, optionVote } = require('../controllers/optionController')
const router=express.Router()
router.post(('/:id/create'),optionText)
router.get('/:id/delete',optionDelete )
router.post('/:id/add_vote',optionVote)
module.exports=router



