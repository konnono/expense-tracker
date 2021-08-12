const db = require('../../config/mongoose')
const Category = require('../category')

const categories = require('./categories.json')

db.once('open', () => {
  Promise.all(categories)
    .then(category => {
      console.log(category)
      return Category.create(category)
    })
    .then(() => {
      console.log('Category seeder completed!')
      db.close()
    })
    .catch(err => console.log(err))
})
