const { createQuestion, deleteQuestion, getQuestion } = require('../controllers/questionController')
const express = require('express')
const router = express.Router()

router.post('/create',createQuestion)
router.get('/:id/delete',deleteQuestion);


router.get('/:id',getQuestion)

module.exports = router