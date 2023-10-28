const { createQuestion, deleteQuestion, getQuestion } = require('../controllers/questionController')
const{optionText}=require('../controllers/optionController')
const express = require('express')
const router = express.Router()

router.post('/create',createQuestion)
router.post('/:id/options/create',optionText)
router.get('/:id/delete',deleteQuestion);
router.get('/:id',getQuestion)


module.exports = router


