const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('./node_modules/body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT || 3000
const hbs = exphbs.create({
  defaultLayout: 'main', extname: '.hbs',
  helpers: {
    selectOption: require('./helpers/selectOption'),
    calculateTotal: require('./helpers/calculateTotal'),
    printIcon: require('./helpers/printIcon'),
    printDate: require('./helpers/printDate')
  }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running on port:${process.env.PORT}`)
})