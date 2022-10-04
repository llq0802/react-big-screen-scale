
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-big-screen-scale.cjs.production.min.js')
} else {
  module.exports = require('./react-big-screen-scale.cjs.development.js')
}
