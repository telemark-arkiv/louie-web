'use strict'

function prepareWarning (data) {
  if (!data) {
    throw new Error('Missing required input: data object')
  }
  var warning = {
    timeStamp: new Date().getTime(),
    studentName: data.studentName,
    studentId: data.studentId,
    documentType: 'varsel',
    documentCategory: data.type
  }

  if (data.orderCategories) {
    if (Array.isArray(data.orderCategories)) {
      data.orderCategories = data.orderCategories.join('\n')
    }
    warning.orderMessage = data.orderCategories
  }

  return warning
}

module.exports = prepareWarning
