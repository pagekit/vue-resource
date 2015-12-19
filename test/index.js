var Vue = require('vue');
var Resource = require('../src');

Vue.use(Resource);

// require specs
require('./url.js');
require('./http.js');
require('./promise.js');
