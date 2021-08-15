const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const recordList = require('./records.json')
const SEED_USERS = [
  {
    email: 'user1@example.com',
    password: '12345678',
    records: recordList.slice(0, 4)
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    records: recordList.slice(5, 9)
  }
]

db.once('open', () => {
  return Promise.all(SEED_USERS.map(async user => {
    const records = user.records
    await User.create({
      email: user.email,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
    })
      .then(user => {
        return Promise.all(records.map(async record => {
          await Record.create({
            name: record.name,
            date: record.date,
            category: record.category,
            amount: record.amount,
            merchant: record.merchant,
            userId: user._id
          })
        }))
      })
  }))
    .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch(err => console.log(err))
})