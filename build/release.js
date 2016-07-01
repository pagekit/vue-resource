var replace = require('replace-in-file');
var version = process.argv[2];

replace({
  files: "bower.json",
  replace: /("version"\s*:\s*")\d+\.\d+\.\d+("\s*,)/g,
  with: "$1" + version + "$2"
});

replace({
  files: "package.json",
  replace: /("version"\s*:\s*")\d+\.\d+\.\d+("\s*,)/g,
  with: "$1" + version + "$2"
});

replace({
  files: "README.md",
  replace: /(\/|@)\d+\.\d+\.\d+/g,
  with: "$1" + version
});
