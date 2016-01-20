'use strict'

// For OpenLDAP:
// searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})'
// For Active Directory:
// searchFilter: '(sAMAccountName={{username}})'

var config = {
  SERVER_PORT_WEB: process.env.SERVER_PORT || 8000,
  SERVER_PORT_API: process.env.SERVER_PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go',
  COOKIE_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go',
  LDAP: {
    url: process.env.LDAP_URL || 'ldap://ldap.forumsys.com:389',
    bindDn: process.env.LDAP_BIND_DN || 'cn=read-only-admin,dc=example,dc=com',
    bindCredentials: process.env.LDAP_BIND_CREDENTIALS || 'password',
    searchBase: process.env.LDAP_SEARCH_BASE || 'dc=example,dc=com',
    searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})'
  }
}

module.exports = config
