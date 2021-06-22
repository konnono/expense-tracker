const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('./node_modules/body-parser')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))


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

app.listen(port, () => {
  console.log(`Server is up and running on http://localport:${port}`)
})