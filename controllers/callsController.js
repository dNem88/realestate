const callsController = require('express').Router()
const ObjectId = require('mongodb').ObjectId

callsController.get('/', async(req,res,next) => {
    try{
        let calls = await req.app.locals.client.db('realestate').collection('calls').find().toArray();
        console.log(calls)
        res.status(200).json(calls)
    }catch(err) {
        res.status(400).json(err)
    }
   
})
callsController.post('/', async(req,res,next) => {
    const data = req.body
    data['createdAd'] = Date()
     try{
        let response = await req.app.locals.client.db('realestate').collection('calls').insertOne({...data, date: Date()})
        res.status(201).json(response)
        console.log(response)
    } catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})

module.exports = callsController