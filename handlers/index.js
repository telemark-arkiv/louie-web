'use strict'

var pkg = require('../package.json')

function getFrontpage (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName
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
    versionName: pkg.louie.versionName
  }
  reply.view('index', viewOptions)
}

function doLogout (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName
  }
  reply.view('index', viewOptions)
}

function doSearch (request, reply) {
  var students = require('../test/data/students')
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName,
    students: students
  }
  reply.view('search-results', viewOptions)
}

function writeWarning (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName
  }
  reply.view('warning', viewOptions)
}

function submitWarning (request, reply) {
  var viewOptions = {
    version: pkg.version,
    versionName: pkg.louie.versionName
  }
  reply.view('index', viewOptions)
}

module.exports.getFrontpage = getFrontpage

module.exports.getLoginPage = getLoginPage

module.exports.doLogin = doLogin

module.exports.doLogout = doLogout

module.exports.doSearch = doSearch

module.exports.writeWarning = writeWarning

module.exports.submitWarning = submitWarning
