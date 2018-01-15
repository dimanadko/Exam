'use strict';

const fs = require('fs');

const suppliesData = JSON.parse(fs.readFileSync('./data.json'));
console.log(suppliesData);
