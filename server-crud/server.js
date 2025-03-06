const express = require('express');
const app = express();
const fs = require('node:fs');
const Handlebars = require('handlebars');
const { v4: uuidv4 } = require('uuid');

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

  let data = fs.readFileSync('./data/data.json', 'utf-8'); // skaitom faila
  data = JSON.parse(data); // darom masyva nes ten json stringas

  data = data.map(d => ({...d, license: parseInt(d.license), truckModel: trucks.find(t => t.id == d.truck).title}));

  res.send(template({
    ...staticData,
    title: 'Drivers List',
    data
  }));

});


app.get('/create', (req, res) => {
  const template = makePage('create');
  res.send(template({
    ...staticData,
    title: 'New Driver',
  }));
});

app.post('/store', (req, res) => {

  const { driver_table, truck, license } = req.body;

  //cia bus kazkadatai padaryta validacija ir sanitizacija

  const id = uuidv4();

  let data = fs.readFileSync('./data/data.json', 'utf-8'); // skaitom sena faila
  data = JSON.parse(data); // darom masyva nes ten json stringas

  data.unshift({ id, driver_table, truck, license: license ?? '0' }); // pridedam nauja irasa

  data = JSON.stringify(data); // verciam i json stringa

  fs.writeFileSync('./data/data.json', data); // rasom i faila

  res.redirect(staticData.url); // kreipiame i pradini puslapi

});


const port = 80;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});