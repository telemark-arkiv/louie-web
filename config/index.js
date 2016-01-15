'use strict'

var config = {
  SERVER_PORT: process.env.SERVER_PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go',
  COOKIE_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go'
}

module.exports = config
