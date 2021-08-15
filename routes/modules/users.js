const express = require('express')
const router = express.Router()

// 渲染使用者登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//渲染使用者註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router