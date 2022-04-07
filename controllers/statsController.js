const statsController = require('express').Router()
const ObjectId = require('mongodb').ObjectId



statsController.post('/', async (req, res, next) => {
    const months = ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември']
    let {collection, year, month} = req.body;
    if (collection === 'оферти') {
        collection = 'offers'
    }
     if (collection === 'клиенти') {
        collection = 'customers'
    }
     if (collection === 'обаждания') {
         collection = 'calls'
     }
      if (collection === 'сделки') {
          collection = 'deals'
      }
    month = months.indexOf(month)
    console.log(collection, year, month)
    try{
        let stats = await req.app.locals.client.db('realestate').collection(`${collection}`).find().sort({
            "createdAt": -1
        }).toArray();
        console.log(stats)
        res.status(200).json(stats)
    } catch(err) {
        console.log(err)
        res.status(400).json('Failed to fetch!')
    }
})

module.exports = statsController;