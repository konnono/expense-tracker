const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
let years = []

const generateYearArray = require('../../helpers/generateYearArray')
const setDateRange = require('../../helpers/setDateRange')

router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryFilter = req.query.categoryFilter ? { category: req.query.categoryFilter } : {}
  const yearFilter = req.query.yearFilter
  const monthFilter = req.query.monthFilter

  // 根據yearFilter和monthFilter產出資料的時間區間篩選條件
  const dateRange = setDateRange(yearFilter, monthFilter)

  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      //根據資料庫中的所有資料產生年度的array作為年度篩選的下拉選項
      years = generateYearArray(records)
    })
    .then(() => {
      Category.find()
        .lean()
        .then(categories => {
          Record.find({ $and: [{ userId }, categoryFilter, dateRange] })
            .lean()
            .sort({ date: 'desc' })
            .then(records => {
              // 如果篩選條件只有月份沒有年，使用filter過濾出選取的月份
              if (!yearFilter && monthFilter) {
                records = records.filter(record => (record.date.getMonth() + 1).toString() === monthFilter)
              }

              res.render('index', { records, categories, years, months, categoryFilter: req.query.categoryFilter, yearFilter, monthFilter })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
})

module.exports = router