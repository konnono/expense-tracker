const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })

})

router.post('/', (req, res) => {
  const categoryName = req.body.category
  Category.findOne({ name: { $regex: categoryName, $options: 'i' } })
    .lean()
    .then(ctg => {
      req.body.icon = ctg.icon
      Record.create(req.body)
      res.redirect('./')
    })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .then(categories => {
      Record.findById(id)
        .lean()
        .then(record => {
          category = record.category
          res.render('edit', { categories, record, category })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body
  Category.findOne({ name: { $regex: category, $options: 'i' } })
    .lean()
    .then(ctg => {
      Record.findById(id)
        .then(record => {
          record.name = name
          record.date = date
          record.category = category
          record.amount = amount
          record.icon = ctg.icon
          record.save()
        })
    }).then(() => {
      res.redirect('/')
    }).catch(error => console.log(error))
})

router.delete('/:id/', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router