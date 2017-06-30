const express = require('express')
const router = express.Router()
const models = require('../models')
const faker = require('faker')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')

router.use(bodyParser.urlencoded({extended: false}))
router.use(session({secret: 'ryan', resave: false, saveUninitialized: true}))
router.use(expressValidator())

var sess

router.get('/', function(req, res) {
  sess = req.session
  if (sess.username) {
    models.gab.findAll().then(function(gabs){
      return res.render('index', {user: sess.username, gabs: gabs})
    })
  } else {
    return res.redirect('/login')
  }
})

router.get('/create', function(req, res) {
  sess = req.session
  if (sess.username) {
    return res.render('create', {user: sess.username})
  } else {
    return res.redirect('/login')
  }
})

router.get('/signup', function(req, res) {
  res.render('signup')
})

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/creategab', function(req, res) {
  models.gab.create({postedby: sess.username, msg: req.body.gab, likes: 0}).then(function() {
    return res.redirect('/create')
  })
})

router.post('/signup', function(req, res) {
  const username = req.body.username
  const password = req.body.password
  const confirm = req.body.confirm
  const nonmatching = 'Your passwords did not match!'

  if (password === confirm) {
    models.user.create({username: username, password: password}).then(function() {
      return res.redirect('/login')
    })
  } else {
    return res.render('signup', {nonmatching: nonmatching})
  }
})

router.post('/login', function(req, res) {
  const username = req.body.username
  const password = req.body.password
  const incorrectPwd = 'Your password is incorrect!'
  const noUsername = 'Your username was not found!'
  sess = req.session

  models.user.findOne({
    where: {
      username: username
    }
  }).then(function(user) {
    if (user.password === password) {
      sess.username = user.username
      sess.password = user.password
      return res.redirect('/')
    } else {
      return res.render('login', {incorrectPwd: incorrectPwd})
    }
  }).catch(function(error) {
    return res.render('login', {noUsername: noUsername})
  })
})

router.post('/logout', function(req, res) {
  sess = req.session
  sess.username = ''
  sess.password = ''
  return res.redirect('/login')
})

module.exports = router
