const offersController = require('express').Router()
const ObjectId = require('mongodb').ObjectId

offersController.get('/', async (req, res, next) => {
    try{
        let offers = await req.app.locals.client.db('realestate').collection('offers').find().toArray();
        res.status(200).json(offers)
    } catch(err) {
        res.status(400).json('Failed to fetch!')
    }
})
offersController.post('/', (req, res, next) => {
    const data = req.body;
    try{
        req.app.locals.client.db('realestate').collection('offers').insertOne(data)
    }catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})
offersController.put('/', (req, res, next) => {
    const data = {...req.body}
    delete data._id
    console.log(data, req.body)
    try{
        req.app.locals.client.db("realestate").collection('offers').updateOne({_id: ObjectId(req.body._id)}, {$set: data})
    }catch(err) {
        res.status(400).json('Failed to update offer!')
    }
})
offersController.delete('/', (req, res, next) => {

    try{
        req.app.locals.client.db("realestate").collection('offers').deleteOne({_id: ObjectId(req.body._id)}, )
    }catch(err) {
        res.status(400).json('Failed to delete offer!')
    }
})
module.exports = offersController;