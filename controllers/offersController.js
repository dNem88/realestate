const offersController = require('express').Router()
const ObjectId = require('mongodb').ObjectId

offersController.get('/', async (req, res, next) => {
    try{
        let offers = await req.app.locals.client.db('realestate').collection('offers').find().sort({"price": -1}).toArray();
        res.status(200).json(offers)
    } catch(err) {
        res.status(400).json('Failed to fetch!')
    }
})
offersController.get('/:id', async (req, res, next) => {
    
    try {
        let offer = await req.app.locals.client.db('realestate').collection('offers').findOne({_id: ObjectId(req.params.id)});
        res.status(200).json(offer)
    } catch (err) {
        res.status(400).json('Failed to fetch!')
    }
})
offersController.post('/', async(req, res, next) => {
    const data = req.body;
    data['createdAt'] = Date()
    data['updatedAt'] = Date()
    try{
        let response = await req.app.locals.client.db('realestate').collection('offers').insertOne(data)
        if (!response.insertedId) {
            throw new Error('Failed to insert data!')
        }
        res.status(201).json(response)
    }catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})
offersController.put('/:id', async(req, res, next) => {
    const data = {...req.body}
    delete data._id
    data['updatedAt'] = Date()
    try{
        let response = await req.app.locals.client.db("realestate").collection('offers').updateOne({_id: ObjectId(req.body._id)}, {$set: data})
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to update offer!')
    }
})
offersController.delete('/', async(req, res, next) => {

    try{
        let response = await req.app.locals.client.db("realestate").collection('offers').deleteOne({_id: ObjectId(req.body._id)}, )
        
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to delete offer!')
    }
})
module.exports = offersController;