import express from 'express';
import fs from 'node:fs';
import Handlebars from 'handlebars';
import {v4 as uuidv4} from 'uuid';

const app = express();

Handlebars.registerHelper('isValuesAreEq', function (value1, value2) {
  return value1 === value2 ? 'selected' : ''
});

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


app.get('/delete/:id', (req, res) => {

  const id = req.params.id;

  let data = fs.readFileSync('./data/data.json', 'utf-8'); // skaitom sena faila
  data = JSON.parse(data); // darom masyva nes ten json stringas

  const driver = data.find(d => d.id === id);

  const template = makePage('delete');

  res.send(template({
    ...staticData,
    title: 'Confirm delete',
    driver,
    hideMenu: true
  }));

});


app.post('/destroy/:id', (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync('./data/data.json', 'utf-8');
  data = JSON.parse(data);
  data = data.filter(d => d.id !== id);
  data = JSON.stringify(data);
  fs.writeFileSync('./data/data.json', data);
  res.redirect(staticData.url);
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync('./data/data.json', 'utf-8');
  data = JSON.parse(data);
  const driver = data.find(d => d.id === id);
  const template = makePage('edit');
  res.send(template({
    ...staticData,
    title: 'Edit driver',
    driver,
  }));
});





const port = 80;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});