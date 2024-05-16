const callsController = require('express').Router()
const ObjectId = require('mongodb').ObjectId
const clientPromise = require('../config/database');


callsController.get('/', async(req,res,next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    try{
        let calls = await db.collection('calls').find().sort({"createdAt": -1}).toArray();
        res.status(200).json(calls)
    }catch(err) {
        res.status(400).json(err)
    }
   
})
callsController.post('/', async(req,res,next) => {
    const client = await clientPromise;
    const db = client.db('realestate')
    const data = req.body
    data['createdAt'] = Date()
     try{
        let response = await db.collection('calls').insertOne({...data})
        res.status(201).json(response)
        console.log(response)
    } catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})

module.exports = callsController