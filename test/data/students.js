'use strict'

var students = [
  {
    name: 'Hallgrim Durk',
    fodselsnummer:  '18117148321',
    fag: [
      {
        fagkode: '187284/8745',
        fagnavn: 'Popcornpopping vg 2'
      },
      {
        fagkode: '187284/8745',
        fagnavn: 'Filmvitenskap for sangere'
      },
      {
        fagkode: '187284/8745',
        fagnavn: 'Elgjakt uten våpen'
      },
      {
        fagkode: '187284/8745',
        fagnavn: 'Produktbeskrivelser for boksfisk'
      }
    ],
    isContact: true
  },
  {
    name: 'Helga Durk',
    fodselsnummer:  '220475148321',
    fag: [
      {
        fagkode: '187284/8745',
        fagnavn: 'Popcornpopping vg 2'
      }
    ],
    isContact: false
  }
]

module.exports = students
