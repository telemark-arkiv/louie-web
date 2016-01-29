'use strict'

function isValid () {
  var usr = document.getElementById('username')
  var pwd = document.getElementById('userpass')
  var submit = document.getElementById('submitLogin')

  if (usr.value && pwd.value) {
    submit.disabled = false
  }
}

function init () {
  var usr = document.getElementById('username')
  var pwd = document.getElementById('userpass')
  var submit = document.getElementById('submitLogin')

  submit.disabled = true

  usr.addEventListener('input', function (e) {
    console.log('hei')
    isValid()
  })

  pwd.addEventListener('input', function (e) {
    console.log('ho')
    isValid()
  })
}

function ready (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(init)
