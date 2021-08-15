const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// 渲染使用者登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 渲染使用者登入頁面
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//註冊使用者
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  //若未輸入email、密碼及確認密碼，請使用者重新填寫
  if (!email || !password || !confirmPassword) {
    console.log('Email、密碼及確認密碼為必填欄位')
    return res.render('register', { name, email, password, confirmPassword })
  }

  //若密碼及確認密碼不相符，請使用者重新填寫
  if (password !== confirmPassword) {
    console.log('密碼與確認密碼不同')
    return res.render('register', { name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then(user => {
      //如果使用者已存在資料庫中，回到註冊頁面
      if (user) {
        console.log('這個email已註冊過')
        return res.render('register', { name, email, password, confirmPassword })
      }

      User.create({ name, email, password, confirmPassword })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router