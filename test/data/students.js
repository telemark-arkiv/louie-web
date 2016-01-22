'use strict'

var students = [
  {
    name: 'Hallgrim Durk',
    fodselsnummer: '18117148321',
    skoleId: '0987635467484',
    skoleNavn: 'Birger Bønks videregående skole',
    alleFag: [
      {
        fagkode: '187284/8740',
        fagnavn: 'Popcornpopping vg 2'
      },
      {
        fagkode: '187284/8750',
        fagnavn: 'Filmvitenskap for sangere'
      },
      {
        fagkode: '187284/8760',
        fagnavn: 'Elgjakt uten våpen'
      },
      {
        fagkode: '187284/8770',
        fagnavn: 'Produktbeskrivelser for boksfisk'
      }
    ],
    mineFag: [
      {
        fagkode: '187284/8740',
        fagnavn: 'Popcornpopping vg 2'
      },
      {
        fagkode: '187284/8750',
        fagnavn: 'Filmvitenskap for sangere'
      },
      {
        fagkode: '187284/8760',
        fagnavn: 'Elgjakt uten våpen'
      },
      {
        fagkode: '187284/8770',
        fagnavn: 'Produktbeskrivelser for boksfisk'
      }
    ],
    isContact: true
  },
  {
    name: 'Helga Durk',
    fodselsnummer: '220475148321',
    skoleId: '0987635467484',
    skoleNavn: 'Birger Bønks videregående skole',
    alleFag: [
      {
        fagkode: '187284/8740',
        fagnavn: 'Popcornpopping vg 2'
      },
      {
        fagkode: '187284/8760',
        fagnavn: 'Elgjakt uten våpen'
      }
    ],
    mineFag: [
      {
        fagkode: '187284/8760',
        fagnavn: 'Elgjakt uten våpen'
      }
    ],
    isContact: false
  }
]

module.exports = students
