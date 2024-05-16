const offersController = require('express').Router()
const ObjectId = require('mongodb').ObjectId
const clientPromise = require('../config/database');

offersController.get('/', async (req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    try{
        let offers = await db.collection('offers').find({active: 'true'}).sort({"createdAt": -1}).toArray();
        console.log(offers)
        res.status(200).json(offers)
    } catch(err) {
        res.status(400).json('Failed to fetch!')
    }
})
offersController.get('/archive', async (req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    try {
        let archive = await db.collection('offers').find({
            active: 'false'
        }).sort({
            "createdAt": -1
        }).toArray();
        res.status(200).json(archive)
    } catch (err) {
        res.status(400).json('Failed to fetch!')
    }
})
offersController.get('/:id', async (req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    try {
        let offer = await db.collection('offers').findOne({_id: ObjectId(req.params.id)});
        res.status(200).json(offer)
    } catch (err) {
        res.status(400).json('Failed to fetch!')
    }
})
offersController.post('/', async(req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    const data = req.body;
    data['createdAt'] = Date()
    data['updatedAt'] = Date()
    data['active'] = 'true'
    try{
        let response = await db.collection('offers').insertOne(data)
        if (!response.insertedId) {
            throw new Error('Failed to insert data!')
        }
        res.status(201).json(response)
    }catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})
offersController.put('/:id', async(req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    const data = {...req.body}
    delete data._id
    data['updatedAt'] = Date()
    try{
        let response = await db.collection('offers').updateOne({_id: ObjectId(req.body._id)}, {$set: data})
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to update offer!')
    }
})
offersController.delete('/', async(req, res, next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    try{
        let response = await db.collection('offers').deleteOne({_id: ObjectId(req.body._id)}, )
        
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to delete offer!')
    }
})
module.exports = offersController;