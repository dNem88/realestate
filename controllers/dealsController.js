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
dealsController.get('/:id', async (req, res, next) => {
    
     try {
        let deal = await req.app.locals.client.db('realestate').collection('deals').findOne({_id: ObjectId(req.params.id)});
        console.log(deal)
        res.status(200).json(deal)
    } catch (err) {
        res.status(400).json('Failed to fetch deal!')
    }
})
dealsController.post('/', async(req, res, next) => {
    const data = req.body;
    try{
        let response = await req.app.locals.client.db('realestate').collection('deals').insertOne({...data, date: Date(), createdAt: Date()})
        res.status(201).json(response)
    }catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})
dealsController.put('/:id', async(req, res, next) => {
    const data = {...req.body}
    delete data._id
    delete data.date
    data['updatedAt'] = Date()
    
    try{
        let response = await req.app.locals.client.db("realestate").collection('deals').updateOne({_id: ObjectId(req.body._id)}, {$set: data})
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to update deal!')
    }
})
dealsController.delete('/', async(req, res, next) => {

    try{
        let response = await req.app.locals.client.db("realestate").collection('deals').deleteOne({_id: ObjectId(req.body._id)}, )
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to delete deal!')
    }
})
module.exports = dealsController;