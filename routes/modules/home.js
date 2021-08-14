const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

router.get('/', (req, res) => {
  const categoryFilter = req.query.categoryFilter ? { category: req.query.categoryFilter } : {}
  const yearFilter = req.query.yearFilter
  const monthFilter = req.query.monthFilter
  // console.log(categoryFilter, yearFilter, monthFilter)

  let startDate
  let endDate
  let dateFilter = {}

  if (yearFilter && monthFilter) {
    startDate = new Date(yearFilter, monthFilter - 1, 1)
    const lastDay = new Date(yearFilter, monthFilter, 0).getDate()
    endDate = new Date(yearFilter, monthFilter - 1, lastDay, 23, 59, 59)
    // console.log(startDate.toLocaleString(), endDate.toLocaleString())
    dateFilter = { date: { $gte: startDate, $lte: endDate } }
  }

  if (yearFilter && !monthFilter) {
    startDate = new Date(yearFilter, 0, 1)
    endDate = new Date(yearFilter, 11, 31, 23, 59, 59)
    // console.log(startDate.toLocaleString(), endDate.toLocaleString())
    dateFilter = { date: { $gte: startDate, $lte: endDate } }
  }

  const years = []
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      //產生年度的array作為年度篩選的下拉選項
      const endYear = records[0].date.getFullYear()
      const startYear = records[records.length - 1].date.getFullYear()

      for (let i = startYear; i <= endYear; i++) {
        years.push(i)
      }
    })
    .then(() => {
      // console.log('dateFilter:', dateFilter)
      Category.find()
        .lean()
        .then(categories => {
          Record.find({ $and: [categoryFilter, dateFilter] })
            .lean()
            .sort({ date: 'desc' })
            .then(records => {
              if (!yearFilter && monthFilter) {
                // console.log('monthFilter:', monthFilter)
                // records.map(record => console.log(record.name, record.date.getMonth() + 1))
                records = records.filter(record => (record.date.getMonth() + 1).toString() === monthFilter)

                // console.log('records', records)
              }
              res.render('index', { records, categories, years, months, categoryFilter: req.query.categoryFilter, yearFilter: req.query.yearFilter, monthFilter: req.query.monthFilter })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
})

module.exports = router