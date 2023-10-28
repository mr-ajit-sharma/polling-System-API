const Question=require('../models/question')
const Option=require('../models/option')

// creating another question in the question
const optionText= async (req, res) => {
    try {
        let question = await Question.findById(req.params.id)

        if (question) {
            let option = await Option.create(req.body)
            option.link_to_vote = `http://localhost:8000/option/${option._id}/add_vote`
            question.options.push(option._id)
            question.save()
            option.save()
            return res.status(200).json({ message: "option created successfully", question })
        }
        return res.status(404).json({ message: "question not found" })
} catch (error) {
        console.log(error, "error in creation of the question in the option")
        return res.status(500).json({ message: "internal server error" })
    }
}

// creating the deleting function for the deletion in the options
const optionDelete=async (req, res) => {
    try {
        
        let option = await Option.findById(req.params.id)
        console.log(option)
        if (option.vote === 0) {
            await option.deleteOne()
            return res.status(200).json({ message: "successfully deleted" })
        }else{

            return res.status(404).json({ message: "cannot delete option with vote greater then zero" })
        }
    } catch (error) {
        console.log(error, "internal system error ")
    }
}

// creating the vote function to add the vote
const optionVote= async (req, res) => {
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
}
module.exports={optionText,optionDelete,optionVote}