'use strict'

var mongojs = require('mongojs')
var Wreck = require('wreck')
var config = require('../config')
var dblog = mongojs(config.DB_CONNECTION_LOG)
var dbqueue = mongojs(config.DB_CONNECTION_QUEUE)
var logs = dblog.collection('logs')
var queue = dbqueue.collection('queue')
var pkg = require('../package.json')
var prepareWarning = require('../lib/prepare-warning')
var order = require('../lib/categories-order')
var behaviour = require('../lib/categories-behaviour')
var warningTypes = require('../lib/categories-warnings')
var wreckOptions = {
  json: true
}

function filterWarningTypes (isContact) {
  var filteredList = []
  // dirty fix while testing
  isContact = true
  warningTypes.forEach(function (type) {
    if (type.id === 'karakter' || isContact) {
      filteredList.push(type)
    }
  })
  return filteredList
}

function getFrontpage (request, reply) {
  logs.find({'userId': request.auth.credentials.data.userId}).sort({timeStamp: -1}, function (error, data) {
    if (error) {
      console.error(error)
    }
    var viewOptions = {
      version: pkg.version,
      versionName: pkg.louie.versionName,
      versionVideoUrl: pkg.louie.versionVideoUrl,
      systemName: pkg.louie.dusteNavn,
      githubUrl: pkg.repository.url,
      credentials: request.auth.credentials,
      logs: data
    }
    reply.view('index', viewOptions)
  })
}

function getLogspage (request, reply) {
  var query = {
    'userId': request.auth.credentials.data.userId
  }
  if (request.query.studentId) {
    query.studentId = request.query.studentId
  }

  logs.find(query).sort({timeStamp: -1}, function (error, data) {
    if (error) {
      console.error(error)
    }
    var viewOptions = {
      version: pkg.version,
      versionName: pkg.louie.versionName,
      versionVideoUrl: pkg.louie.versionVideoUrl,
      systemName: pkg.louie.dusteNavn,
      githubUrl: pkg.repository.url,
      credentials: request.auth.credentials,
      logs: data
    }
    reply.view('logs', viewOptions)
  })
}

function getHelppage (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.dusteNavn,
    githubUrl: pkg.repository.url,
    credentials: request.auth.credentials
  }
  reply.view('help', viewOptions)
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
      if (err.name) {
        var viewOptions = {
          version: pkg.version,
          versionName: pkg.louie.versionName,
          versionVideoUrl: pkg.louie.versionVideoUrl,
          systemName: pkg.louie.dusteNavn,
          githubUrl: pkg.repository.url,
          loginErrorMessage: err.name
        }
        reply.view('login', viewOptions, {layout: 'layout-login'})
      }
    } else {
      var tokenOptions = {
        expiresIn: '1h',
        issuer: 'https://auth.t-fk.no'
      }
      var data = {
        cn: user.cn,
        userId: user.sAMAccountName || ''
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

/*
// For local testing
function doLogin (request, reply) {
  var jwt = require('jsonwebtoken')
  var payload = request.payload
  var username = payload.username
  // var password = payload.password
  var user = {
    cn: username,
    userId: username
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
*/

function doLogout (request, reply) {
  request.cookieAuth.clear()
  reply.redirect('/')
}

function doSearch (request, reply) {
  var data = request.payload
  var searchText = data.searchText
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    systemName: pkg.louie.dusteNavn,
    githubUrl: pkg.repository,
    credentials: request.auth.credentials,
    searchText: searchText
  }
  var searchUrl = config.BUDDY_API_URL + '/search/' + request.auth.credentials.data.userId + '/'
  wreckOptions.headers = {
    Authorization: request.auth.credentials.token
  }

  Wreck.get(searchUrl + searchText, wreckOptions, function (error, res, payload) {
    if (error) {
      reply(error)
    } else {
      viewOptions.students = payload
      request.cookieAuth.set('searchResults', payload)
      reply.view('search-results', viewOptions)
    }
  })
}

/*
// For local testing
function doSearch (request, reply) {
  var students = require('../test/data/students')
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
  request.cookieAuth.set('searchResults', students)
  reply.view('search-results', viewOptions)
}
*/

function writeWarning (request, reply) {
  function filterStudents (studentID) {
    var chosen
    request.auth.credentials.searchResults.forEach(function (student) {
      if (student.personalIdNumber === studentID) {
        chosen = student
      }
    })
    return chosen
  }

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
  var user = request.auth.credentials.data
  var data = request.payload
  data.studentId = request.params.studentID
  data.userId = user.userId
  data.userName = user.cn
  var postData = prepareWarning(data)
  queue.save(postData, function (error, doc) {
    if (error) {
      console.error(error)
    } else {
      postData.documentId = doc._id.toString()
      postData.documentStatus = [
        {
          timeStamp: new Date().getTime(),
          status: 'I kø'
        }
      ]
      logs.save(postData)
      reply.redirect('/')
    }
  })
}

module.exports.getFrontpage = getFrontpage

module.exports.getLogspage = getLogspage

module.exports.getHelppage = getHelppage

module.exports.showLogin = showLogin

module.exports.doLogin = doLogin

module.exports.doLogout = doLogout

module.exports.doSearch = doSearch

module.exports.writeWarning = writeWarning

module.exports.submitWarning = submitWarning
