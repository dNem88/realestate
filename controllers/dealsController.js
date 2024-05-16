const dealsController = require('express').Router()
const ObjectId = require('mongodb').ObjectId
const clientPromise = require('../config/database');


dealsController.get('/', async (req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    
    try{
        let deals = await db.collection('deals').find().sort({
            "createdAt": -1
        }).toArray();
        res.status(200).json(deals)
    } catch(err) {
        console.log(err)
        res.status(400).json('Failed to fetch!')
    }
})

dealsController.get('/:id', async (req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
     try {
        let deal = await db.collection('deals').findOne({_id: ObjectId(req.params.id)});
       
        res.status(200).json(deal)
    } catch (err) {
        res.status(400).json('Failed to fetch deal!')
    }
})
dealsController.post('/', async(req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    const data = req.body;
    console.log(data);
    try{
        let response = await db.collection('deals').insertOne({...data, date: Date(), createdAt: new Date()})
        res.status(201).json(response)
    }catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})
dealsController.put('/:id', async(req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    const data = {...req.body}
    delete data._id
    delete data.date
    data['updatedAt'] = new Date()
    
    try{
        let response = await db.collection('deals').updateOne({_id: ObjectId(req.body._id)}, {$set: data})
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to update deal!')
    }
})
dealsController.delete('/', async(req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    try{
        let response = await db.collection('deals').deleteOne({_id: ObjectId(req.body._id)}, )
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to delete deal!')
    }
})
module.exports = dealsController;