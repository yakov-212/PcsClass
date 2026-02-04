'use strict';
const fs = require('fs');

const fileContent = fs.readFileSync(process.argv[2], 'utf8');
console.log(fileContent.split('\n').length - 1);