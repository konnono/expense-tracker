const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('./node_modules/body-parser')
const methodOverride = require('method-override')
const Handlebars = require('handlebars')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' })

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

hbs.handlebars.registerHelper('selectOption', function (category, listOption) {
  return category === listOption ? new Handlebars.SafeString('<option selected>' + listOption + '</option>') : new Handlebars.SafeString('<option>' + listOption + '</option>')
})


app.listen(port, () => {
  console.log(`Server is up and running on http://localport:${port}`)
})