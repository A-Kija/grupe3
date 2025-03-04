const express = require('express');
const app = express();
const fs = require('node:fs');
const Handlebars = require('handlebars');

// public folder
app.use(express.static('public'));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const staticData = {
  url: 'http://localhost/'
}


const makePage = page => {
  const topHtml = fs.readFileSync('./templates/top.hbs', 'utf8');
  const pageHtml = fs.readFileSync(`./templates/${page}.hbs`, 'utf8');
  const bottomHtml = fs.readFileSync('./templates/bottom.hbs', 'utf8');
  return Handlebars.compile(topHtml + pageHtml + bottomHtml);
}

// Listas

app.get('/', (req, res) => {

  const template = makePage('list');

  res.send(template({
    ...staticData,
    title: 'Fūristų sąrašas',
  }));

});


const port = 80;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});