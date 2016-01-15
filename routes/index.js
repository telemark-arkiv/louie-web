'use strict'

var handlers = require('../handlers')

var routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.getFrontpage,
      description: 'Show the frontpage'
    }
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      handler: handlers.showLogin,
      description: 'Show the Logingpage',
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      handler: handlers.doLogin,
      description: 'Login',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/logout',
    config: {
      handler: handlers.doLogout
    }
  },
  {
    method: 'POST',
    path: '/search',
    config: {
      handler: handlers.doSearch
    }
  },
  {
    method: 'GET',
    path: '/warning/{studentID}',
    config: {
      handler: handlers.writeWarning,
      description: 'Get student by {studentID}'
    }
  },
  {
    method: 'POST',
    path: '/warning/{studentID}',
    config: {
      handler: handlers.submitWarning,
      description: 'Get student by {studentID}'
    }
  }

]

module.exports = routes
