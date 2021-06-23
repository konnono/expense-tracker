const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('./node_modules/body-parser')
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
require('./config/mongoose')

const app = express()
const port = 3000

const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' })

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

hbs.handlebars.registerHelper('selectOption', function (category, listOption) {
  return category === listOption ? new Handlebars.SafeString('<option selected>' + listOption + '</option>') : new Handlebars.SafeString('<option>' + listOption + '</option>')
})


const Record = require('./models/record')
const Category = require('./models/category')

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      res.render('index', { records })
    })
    .catch(error => console.log(error))
})

app.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      res.render('new', { categories })
    })

})

app.post('/records', (req, res) => {
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

app.get('/records/:id/edit', (req, res) => {
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

app.put('/records/:id/edit', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is up and running on http://localport:${port}`)
})