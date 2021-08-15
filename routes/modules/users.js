const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

// 渲染使用者登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 使用者登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 渲染使用者註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊使用者
router.post('/register', (req, res) => {

  const { name, email, password, confirmPassword } = req.body
  const errors = []

  // 驗證傳入資料，若有問題回到註冊畫面修正重填
  if (!email) {
    errors.push({ message: 'Email欄位為必填。' })
  }
  if (!password) {
    errors.push({ message: '密碼欄位為必填。' })
  }
  if (!confirmPassword) {
    errors.push({ message: '確認密碼欄位為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }

  User.findOne({ email })
    .then(user => {
      //如果使用者已存在資料庫中，回到註冊頁面
      if (user) {
        errors.push({ message: '這個email已經註冊過了。' })
        return res.render('register', { name, email, password, confirmPassword })
      }

      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//使用者登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')
  res.redirect('/users/login')
})

module.exports = router