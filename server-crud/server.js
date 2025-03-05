const express = require('express');
const app = express();
const fs = require('node:fs');
const Handlebars = require('handlebars');

// public folder
app.use(express.static('public'));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const trucks = [
  { id: 1, title: 'Volvo' },
  { id: 2, title: 'Man' },
  { id: 3, title: 'Scania' },
  { id: 4, title: 'MB' },
  { id: 5, title: 'Kamaz' },
  { id: 6, title: 'Iveco' },
  { id: 7, title: 'MAC' }
];

const staticData = {
  url: 'http://localhost/',
  trucks
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


app.get('/create', (req, res) => {

  const template = makePage('create');

  res.send(template({
    ...staticData,
    title: 'New Driver',
  }));

});


const port = 80;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});