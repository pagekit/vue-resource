var Vue = require('vue');
var Resource = require('../src');

Vue.use(Resource);

// require specs
require('./http.js');
require('./promise.js');
