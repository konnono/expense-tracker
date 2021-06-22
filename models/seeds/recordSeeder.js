const db = require('../../config/mongoose')
const Record = require('../record')
const Category = require('../category')
const records = require('./records.json')

db.once('open', () => {
  Category.find()
    .lean()
    .then(categories => {
      records.forEach((record, index) => {
        setTimeout(() => {
          const ctg = categories.filter(item => item.name === record.category)
          record.icon = JSON.stringify(ctg[0].icon)
          Record.create(record)
        }, index * 500)
      })

      setTimeout(() => {
        console.log('Record seeder completed!')
        db.close()
      }, records.length * 500 + 1000)
    })
})
