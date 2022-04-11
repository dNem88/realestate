const customersController = require('express').Router()
const ObjectId = require('mongodb').ObjectId



customersController.get('/', async (req, res, next) => {
    
    try{
        let customers = await req.app.locals.client.db('realestate').collection('customers').find().sort({
            "createdAt": -1
        }).toArray();
        res.status(200).json(customers)
    } catch(err) {
        console.log(err)
        res.status(400).json('Failed to fetch!')
    }
})
customersController.get('/offer/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        let customers = await req.app.locals.client.db('realestate').collection('customers').find({offer: ObjectId(id)}).sort({
            "createdAt": -1
        }).toArray();
        res.status(200).json(customers)
    } catch (err) {
        console.log(err)
        res.status(400).json('Failed to fetch!')
    }
})
customersController.get('/:id', async (req, res, next) => {

     try {
        let customer = await req.app.locals.client.db('realestate').collection('customers').findOne({_id: ObjectId(req.params.id)});
        res.status(200).json(customer)
    } catch (err) {
        res.status(400).json('Failed to fetch customer!')
    }
})
customersController.post('/', async(req, res, next) => {
    const data = req.body;
    try{
        let response = await req.app.locals.client.db('realestate').collection('customers').insertOne({...data, createdAt: new Date(), offer: ObjectId(data.offer)})
        res.status(201).json(response)
    }catch(e) {
        res.status(400).json('Failed to insert data!')
    }
})
customersController.put('/:id', async(req, res, next) => {
    const data = {...req.body}
    delete data._id
    delete data.offer
    data['updatedAt'] = new Date()
    
    try{
        let response = await req.app.locals.client.db("realestate").collection('customers').updateOne({_id: ObjectId(req.body._id)}, {$set: data})
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to update deal!')
    }
})
customersController.delete('/', async(req, res, next) => {

    try{
        let response = await req.app.locals.client.db("realestate").collection('customers').deleteOne({_id: ObjectId(req.body._id)}, )
        res.status(200).json(response)
    }catch(err) {
        res.status(400).json('Failed to delete deal!')
    }
})
module.exports = customersController;