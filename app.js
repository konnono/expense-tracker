const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


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

app.listen(port, () => {
  console.log(`Server is up and running on http://localport:${port}`)
})