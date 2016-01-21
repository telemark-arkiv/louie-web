'use strict'

var mongojs = require('mongojs')
var config = require('../config')
// var dblog = mongojs(config.DB_CONNECTION_LOG)
// var dbqueue = mongojs(config.DB_CONNECTION_QUEUE)
// var logs = dblog.collection('logs')
// var queue = dbqueue.collection('queue')
var pkg = require('../package.json')
var students = require('../test/data/students')
var warnings = require('../test/data/warnings')
var order = require('../lib/categories-order')
var behaviour = require('../lib/categories-behaviour')
var warningTypes = require('../lib/categories-warnings')

function filterStudents (studentID) {
  var chosen
  students.forEach(function (student) {
    if (student.fodselsnummer === studentID) {
      chosen = student
    }
  })
  return chosen
}

function filterWarningTypes (isContact) {
  var filteredList = []
  warningTypes.forEach(function (type) {
    if (type.id === 'karakter' || isContact) {
      filteredList.push(type)
    }
  })
  return filteredList
}

function getFrontpage (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.dusteNavn,
    githubUrl: pkg.repository.url,
    credentials: request.auth.credentials,
    myWarnings: warnings
  }
  reply.view('index', viewOptions)
}

function showLogin (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.dusteNavn,
    githubUrl: pkg.repository.url
  }
  reply.view('login', viewOptions, {layout: 'layout-login'})
}

/*
function doLogin (request, reply) {
  var jwt = require('jsonwebtoken')
  var payload = request.payload
  var username = payload.username
  var password = payload.password
  var LdapAuth = require('ldapauth-fork')
  var auth = new LdapAuth(config.LDAP)

  auth.authenticate(username, password, function (err, user) {
    if (err) {
      console.error(JSON.stringify(err))
    } else {
      var tokenOptions = {
        expiresIn: '1h',
        issuer: 'https://auth.t-fk.no'
      }
      var data = {
        cn: user.cn,
        uid: user.mailNickname || ''
      }
      var token = jwt.sign(data, config.JWT_SECRET, tokenOptions)
      request.cookieAuth.set({
        token: token,
        isAuthenticated: true,
        data: data
      })
      auth.close(function (err) {
        if (err) {
          console.error(err)
        }
      })
      reply.redirect('/')
    }
  })
}
*/

function doLogin (request, reply) {
  var jwt = require('jsonwebtoken')
  var payload = request.payload
  var username = payload.username
  var password = payload.password
  var user = {
    cn: username
  }
  var tokenOptions = {
    expiresIn: '1h',
    issuer: 'https://auth.t-fk.no'
  }
  var token = jwt.sign(user, config.JWT_SECRET, tokenOptions)
  request.cookieAuth.set({
    token: token,
    isAuthenticated: true,
    data: user
  })

  reply.redirect('/')
}

function doLogout (request, reply) {
  request.cookieAuth.clear()
  reply.redirect('/')
}

function doSearch (request, reply) {
  var data = request.payload
  var searchText = data.searchText
  var students = require('../test/data/students')
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.dusteNavn,
    githubUrl: pkg.repository,
    credentials: request.auth.credentials,
    students: students,
    searchText: searchText
  }
  reply.view('search-results', viewOptions)
}

function writeWarning (request, reply) {
  var studentID = request.params.studentID
  var student = filterStudents(studentID)
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.dusteNavn,
    githubUrl: pkg.repository.url,
    credentials: request.auth.credentials,
    student: student,
    order: order,
    behaviour: behaviour,
    warningTypes: filterWarningTypes(student.isContact)
  }
  reply.view('warning', viewOptions)
}

function submitWarning (request, reply) {
  /*
  var data = request.payload
  queue.save(data, function(error, doc) {
    if (error) {
      console.error(error)
    } else {
      console.log(doc)
      reply.redirect('/')
    }
  })
  */
  /*
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    githubUrl: pkg.repository.url
  }
  */
  // console.log(data)
  // reply.view('index', viewOptions)
  reply.redirect('/')
}

module.exports.getFrontpage = getFrontpage

module.exports.showLogin = showLogin

module.exports.doLogin = doLogin

module.exports.doLogout = doLogout

module.exports.doSearch = doSearch

module.exports.writeWarning = writeWarning

module.exports.submitWarning = submitWarning
