'use strict';

const fs = require('fs');

const htmlBuffer = fs.readFileSync('./example.html', 'utf8');
const regExp = /<table>(.*)<\/table>/;
function htmlParser(rawHtml) {
  const html = rawHtml.replace(/n/, '');
  return html.match(regExp);
}

console.log(htmlParser(htmlBuffer));
