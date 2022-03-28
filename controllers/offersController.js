const offersController = require('express').Router()

offersController.get('/', (req, res, next) => {
    res.status(200).json({offers: true})
})
offersController.post('/', (req, res, next) => {

})
offersController.put('/', (req, res, next) => {

})
offersController.delete('/', (req, res, next) => {

})
module.exports = offersController;