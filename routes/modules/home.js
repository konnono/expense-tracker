const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const filter = req.query.filter ? { category: req.query.filter } : {}
  Category.find()
    .lean()
    .then(categories => {
      Record.find(filter)
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          res.render('index', { records, categories, filter: req.query.filter })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

module.exports = router