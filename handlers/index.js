'use strict'

var pkg = require('../package.json')
var students = require('../test/data/students')
var warnings = require('../test/data/warnings')

function filterStudents(studentID) {
  var chosen
  students.forEach( function (student) {
    if (student.fodselsnummer === studentID) {
      chosen = student
    }
  })
  return chosen
}

function getFrontpage (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    githubUrl: pkg.repository.url,
    myWarnings: warnings
  }
  reply.view('index', viewOptions)
}

function getLoginPage (request, reply) {
  var viewOptions = {}
  reply.view('login', viewOptions, {layout: 'layout-login'})
}

function doLogin (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    githubUrl: pkg.repository.url
  }
  reply.view('index', viewOptions)
}

function doLogout (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    githubUrl: pkg.repository.url
  }
  reply.view('index', viewOptions)
}

function doSearch (request, reply) {
  var data = request.payload
  var searchText = data.searchText
  var students = require('../test/data/students')
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    githubUrl: pkg.repository,
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
    githubUrl: pkg.repository.url,
    student: student
  }
  reply.view('warning', viewOptions)
}

function submitWarning (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    versionVideoUrl: pkg.louie.versionVideoUrl,
    githubUrl: pkg.repository.url
  }
  // reply.view('index', viewOptions)
  reply.redirect('/')
}

module.exports.getFrontpage = getFrontpage

module.exports.getLoginPage = getLoginPage

module.exports.doLogin = doLogin

module.exports.doLogout = doLogout

module.exports.doSearch = doSearch

module.exports.writeWarning = writeWarning

module.exports.submitWarning = submitWarning
