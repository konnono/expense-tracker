const db = require('../../config/mongoose')
const Category = require('../category')

const categories = require('./categories.json')

db.once('open', () => {
  categories.forEach((category, index) => {
    setTimeout(() => {
      Category.create(category)
    }, index * 500)
  })

  setTimeout(() => {
    console.log('Category seeder completed!')
    db.close()
  }, categories.length * 500 + 1000)
})
