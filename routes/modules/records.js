const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 渲染新增紀錄頁面
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })

})

//新增一筆紀錄
router.post('/', (req, res) => {
  Record.create(req.body)
  res.redirect('./')
})

// 渲染單筆紀錄編輯頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .then(categories => {
      Record.findById(id)
        .lean()
        .then(record => {
          const category = record.category
          const date = record.date.toISOString().split('T')[0]
          res.render('edit', { categories, record, category, date })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

// 編輯單筆紀錄
router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, date, category, amount, merchant } = req.body
  Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      record.merchant = merchant
      record.save()
    })
    .then(() => {
      res.redirect('/')
    }).catch(error => console.log(error))
})

// 刪除單筆紀錄
router.delete('/:id/', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router