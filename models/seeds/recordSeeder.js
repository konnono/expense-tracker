const db = require('../../config/mongoose')
const Record = require('../record')
const records = require('./records.json')

db.once('open', () => {
  Promise.all(records)
    .then(record => {
      console.log(record)
      return Record.create(record)
    })
    .then(() => {
      console.log('Record seeder completed!')
      db.close()
    })
    .catch(err => console.log(err))
})