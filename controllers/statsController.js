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
    if (month) {
        month = months.indexOf(month)
    }
    console.log(collection, year, month)
    try{
        let stats = await req.app.locals.client.db('realestate').collection(`${collection}`).find().sort({
            "createdAt": -1
        }).toArray();
        if (stats) {
            let filtered = stats.filter(x => new Date(x.createdAt).getFullYear() === year);
            if (month) {
                let arrByMonth = filtered.filter(x => new Date(x.createdAt).getMonth() === month)
                console.log('withMonth', arrByMonth)
                res.status(200).json(arrByMonth)
            } else {
                console.log(filtered, 'WITHOUT MONTH')
                res.status(200).json(filtered)
            }
        } else {
            throw new Error('Something unusual happened!')
        }
        
        
    } catch(err) {
        console.log(err)
        res.status(400).json('Failed to fetch!')
    }
})

module.exports = statsController;