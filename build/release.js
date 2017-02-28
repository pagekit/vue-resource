var replace = require('replace-in-file');
var version = process.argv[2];

replace({
  files: "bower.json",
  from: /("version"\s*:\s*")\d+\.\d+\.\d+("\s*,)/g,
  to: "$1" + version + "$2"
});

replace({
  files: "package.json",
  from: /("version"\s*:\s*")\d+\.\d+\.\d+("\s*,)/g,
  to: "$1" + version + "$2"
});

replace({
  files: "README.md",
  from: /(\/|@)\d+\.\d+\.\d+/g,
  to: "$1" + version
});
