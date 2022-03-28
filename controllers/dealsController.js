const dealsController = require('express').Router()

dealsController.get('/', (req,res,next) => {
    res.status(200).json({deals: true})
})
dealsController.post('/', (req,res,next) => {
    res.status(200).json({deals: true})
})


module.exports = dealsController