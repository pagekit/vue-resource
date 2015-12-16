var Vue = require('vue');
var Resource = require('../src');

Vue.use(Resource);

// require specs
require('./promise.js');
require('./http.js');
