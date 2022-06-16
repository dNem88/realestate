const tasksController = require('express').Router()
const ObjectId = require('mongodb').ObjectId;

tasksController.get('/', async(req,res,next) => {
     try {
         let tasks = await req.app.locals.client.db('realestate').collection('tasks').find({
             active: true
         }).sort({
             "expiresAt": 1
         }).toArray();
         res.status(200).json(tasks)
     } catch (err) {
         res.status(400).json('Failed to fetch tasks!')
     }
})
tasksController.get('/:id', async (req, res, next) => {
    try {
        let task = await req.app.locals.client.db('realestate').collection('tasks').findOne({
           _id: ObjectId(req.params.id)
        })
        res.status(200).json(task)
    } catch (err) {
        res.status(400).json('Failed to fetch task!')
    }
})
tasksController.post('/', async(req,res,next) => {
    let payload = req.body
    
    payload['expiresAt'] = req.body.expiresAt
    payload['active'] = true
    try {
        let task = await req.app.locals.client.db("realestate").collection('tasks').insertOne(payload)
        task.insertedId ? res.status(201).json('Successfully created new Task') : res.status(400).json('Something happened!')
    } catch (err) {
        res.status(400).json('Failed to insert task!')
    }
})
tasksController.put('/:id', async(req,res,next) => {
    
    const payload = {...req.body}
    delete payload._id
    payload['updatedAt'] = Date()
    try{
        let response = await req.app.locals.client.db("realestate").collection('tasks').updateOne({_id: ObjectId(req.params.id)}, {$set: payload})
        console.log(response)
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to update offer!')
    }
})
tasksController.delete('/:id', async(req, res, next) => {
    try {
        let response = await req.app.locals.client.db("realestate").collection('tasks').deleteOne({
            _id: ObjectId(req.params.id)
        }, )

        res.status(200).json(response)
    } catch (err) {
        res.status(400).json('Failed to delete offer!')
    }
})
module.exports = tasksController