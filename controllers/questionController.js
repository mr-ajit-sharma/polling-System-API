const Question=require('../models/question')
const Option=require('../models/option')

// create question
const createQuestion= async (req, res) => {
    try {
        const question = await Question.create(req.body)
        res.status(200).json({ message: "created the question successfully", question })
    } catch (error) {
        console.log(error, "error in the internal system error")
    }
}

// delete question
const deleteQuestion= async (req, res) => {
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
}

// get the question
const getQuestion= async (req, res) => {
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
}
module.exports={createQuestion,deleteQuestion,getQuestion}