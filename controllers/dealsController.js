const dealsController = require('express').Router()
const ObjectId = require('mongodb').ObjectId

dealsController.get('/', async (req, res, next) => {
    try{
        let deals = await req.app.locals.client.db('realestate').collection('deals').find().toArray();
        res.status(200).json(deals)
    } catch(err) {
        res.status(400).json('Failed to fetch!')
    }
})
dealsController.post('/', (req, res, next) => {
    const data = req.body;
    try{
        req.app.locals.client.db('realestate').collection('deals').insertOne(data)
    }catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})
dealsController.put('/', (req, res, next) => {
    const data = {...req.body}
    delete data._id
    console.log(data, req.body)
    try{
        req.app.locals.client.db("realestate").collection('deals').updateOne({_id: ObjectId(req.body._id)}, {$set: data})
    }catch(err) {
        res.status(400).json('Failed to update deal!')
    }
})
dealsController.delete('/', (req, res, next) => {

    try{
        req.app.locals.client.db("realestate").collection('deals').deleteOne({_id: ObjectId(req.body._id)}, )
    }catch(err) {
        res.status(400).json('Failed to delete deal!')
    }
})
module.exports = dealsController;