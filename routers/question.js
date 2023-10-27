const Option = require('../models/option')
const Question = require('../models/question')
const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
    res.send("hello brother")
})
router.post('/create', async (req, res) => {
    try {
        const question = await Question.create(req.body)
        res.status(200).json({ message: "created the question successfully", question })
    } catch (error) {
        console.log(error, "error in the internal system error")
    }
})

router.post(('/:id/option/create'), async (req, res) => {
    try {
        let question = await Question.findById(req.params.id)

        if (question) {
            let option = await Option.create(req.body)
            option.link_to_vote = `http://localhost:8000/option/${option._id}/add_vote`
            question.options.push(option._id)
            question.save()
            option.save()
            console.log("question=> ", question, "option-> ", option)

            return res.status(200).json({ message: "option created successfully", question })
        }
        return res.status(404).json({ message: "question not found" })

    } catch (error) {
        console.log(error, "error in creation of the question in the option")
        return res.status(500).json({ message: "internal server error" })
    }

})

router.get('/option/:id/delete', async (req, res) => {
    try {
        const optionId = req.params.id
        let option = await Option.findById(optionId)
        if (option.vote === 0) {
            await option.deleteOne()
            return res.status(200).json({ message: "successfully deleted" })
        }
        return res.status(404).json({ message: "cannot delete option with vote greater then zero" })
    } catch (error) {
        console.log(error, "internal system error ")
    }
})

router.post('/option/:id/add_vote', async (req, res) => {
    try {
        const optionId = req.params.id
        Option.findById(optionId)
            .then((option) => {
                if (option) {
                    option.vote += 1
                    option.save()
                    return res.status(200).json({ message: "vote has been added", option })
                }
                return res.status(200).json({ message: "question has not found" })
            })
    } catch (error) {
        console.log(error, "internal system error in adding vote")
    }
})

router.get('/:id/delete', async (req, res) => {
    try {
        const questionId = req.params.id;
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const hasVotes = question.options.some(option => option.vote > 0);

        if (hasVotes) {
            return res.status(400).json({ message: "Cannot delete because votes exist" });
        }

        // No votes, so delete the associated options and then the question
        await Option.deleteMany({ _id: { $in: question.options } });
        await Question.deleteOne({ _id: questionId });

        return res.status(200).json({ message: "Successfully deleted the question" });
    } catch (error) {
        console.error("Internal system error in deleting the question:", error);
        return res.status(500).json({ message: "Internal system error in deleting the question" });
    }
});


// to view the detail of all the question
router.get('/:id', async (req, res) => {
    try {
        const questionId = req.params.id
        Question.findById(questionId)
            .populate("options")
            .then((question) => {
                if (question) {
                    return res.status(200).json({ question })
                }
            })

    } catch (error) {
        console.log(error, "internal server error in to view question details")
    }
})

module.exports = router