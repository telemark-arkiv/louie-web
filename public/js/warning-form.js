'use strict'

function init () {
  var radios = document.querySelectorAll('.mdl-radio__button')
  hideAllCheckboxes()
  hideAllHeaders()
  showPeriodBox()
  Array.prototype.forEach.call(radios, function(el) {
    el.addEventListener('click', function (e) {
      hideAllCheckboxes()
      hideAllHeaders()
      showPeriodBox()
      showMe(e.target.value)
    })
    if (el.checked) {
      showMe(el.value)
    }
  })
}

function showMe (type) {
  var thisClass = '.chxBx' + type
  var checkBoxes = document.querySelectorAll(thisClass)
  Array.prototype.forEach.call(checkBoxes, function(el) {
    el.style.display = ''
  })
}

function showPeriodBox () {
  var checkBoxes = document.querySelectorAll('.chxBxperiod')
  Array.prototype.forEach.call(checkBoxes, function(el) {
    el.style.display = ''
  })
}

function hideAllCheckboxes () {
  var checkBoxes = document.querySelectorAll('.mdl-checkbox')
  Array.prototype.forEach.call(checkBoxes, function(el) {
    el.style.display = 'none'
  })
}

function hideAllHeaders () {
  var headers = document.querySelectorAll('.warning-form-header')
  Array.prototype.forEach.call(headers, function(el) {
    el.style.display = 'none'
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