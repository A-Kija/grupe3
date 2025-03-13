import express from 'express';
import fs from 'node:fs';
import Handlebars from 'handlebars';
import {v4 as uuidv4} from 'uuid';
import cookieParser  from'cookie-parser';

const app = express();

Handlebars.registerHelper('isSelected', function (value1, value2) {
  return value1 == value2 ? 'selected' : ''
});



// public folder
app.use(express.static('public'));
app.use(cookieParser());

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

const makePage = (page, req, res) => {
  const topHtml = fs.readFileSync('./templates/top.hbs', 'utf8');
  const message = readMessage(req, res);
  const messageHtml = message ? fs.readFileSync('./templates/msg.hbs', 'utf8') : '';
  res.dynamicData = {};
  res.dynamicData.msg = message;
  const oldData = readOldData(req, res);
  if (oldData) {
    res.dynamicData.oldData = oldData;
  }
  const pageHtml = fs.readFileSync(`./templates/${page}.hbs`, 'utf8');
  const bottomHtml = fs.readFileSync('./templates/bottom.hbs', 'utf8');
  return Handlebars.compile(topHtml + messageHtml + pageHtml + bottomHtml);
}

const addMessage = (res, message, type) => {
  let messageObj = { message, type };
  messageObj = JSON.stringify(messageObj);
  res.cookie('action_message', messageObj);
}

const saveOldData = (res, data) => {
  data = JSON.stringify(data);
  res.cookie('old_data', data);
  console.log(data);
}

const readMessage = (req, res) => {
  let msg = req.cookies.action_message || '';
  if (!msg) {
    return null;
  }
  msg = JSON.parse(msg);
  res.clearCookie('action_message');
  return msg;
}

const readOldData = (req, res) => {
  let oldData = req.cookies.old_data || '';
  if (!oldData) {
    return null;
  }
  oldData = JSON.parse(oldData);
  res.clearCookie('old_data');
  return oldData;
}

const validation = (res, text, returnTo) => {
  let message;
  if (!text) {
    message = 'Driver Table is empty.'
  } else if(text.length < 3) {
    message = 'Driver Table must be at least 3 characters';
  } else if(text.length > 50) {
    message = 'Driver table is too long';
  }

  if (message) {
    addMessage(res, message, 'danger');
    res.redirect(staticData.url + returnTo);
    return false;
  }

  return true;
}


// Listas

app.get('/', (req, res) => {

  const template = makePage('list', req, res);

  let data = fs.readFileSync('./data/data.json', 'utf-8'); // skaitom faila
  data = JSON.parse(data); // darom masyva nes ten json stringas

  data = data.map(d => ({...d, license: parseInt(d.license), truckModel: trucks.find(t => t.id == d.truck).title}));

  res.send(template({
    ...staticData,
    ...res.dynamicData,
    title: 'Drivers List',
    data
  }));

});


app.get('/create', (req, res) => {
  const template = makePage('create', req, res);
  res.send(template({
    ...staticData,
    ...res.dynamicData,
    title: 'New Driver',
  }));
});

app.post('/store', (req, res) => {

  const { driver_table, truck, license } = req.body;

  saveOldData(res, { driver_table, truck, license });
  if (!validation(res, driver_table, 'create')) {
    return;
  }

  const id = uuidv4();

  let data = fs.readFileSync('./data/data.json', 'utf-8'); // skaitom sena faila
  data = JSON.parse(data); // darom masyva nes ten json stringas

  data.unshift({ id, driver_table, truck, license: license ?? '0' }); // pridedam nauja irasa

  data = JSON.stringify(data); // verciam i json stringa

  fs.writeFileSync('./data/data.json', data); // rasom i faila
  addMessage(res, 'OK. New driver done.', 'success');
  res.redirect(staticData.url); // kreipiame i pradini puslapi

});


app.get('/delete/:id', (req, res) => {

  const id = req.params.id;

  let data = fs.readFileSync('./data/data.json', 'utf-8'); // skaitom sena faila
  data = JSON.parse(data); // darom masyva nes ten json stringas

  const driver = data.find(d => d.id === id);

  const template = makePage('delete', req, res);

  res.send(template({
    ...staticData,
    ...res.dynamicData,
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
  addMessage(res, 'OK. Driver gone.', 'info');
  res.redirect(staticData.url);
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync('./data/data.json', 'utf-8');
  data = JSON.parse(data);
  const driver = data.find(d => d.id === id);
  driver.license = parseInt(driver.license);
  const template = makePage('edit', req, res);
  res.send(template({
    ...staticData,
    ...res.dynamicData,
    title: 'Edit driver',
    driver,
  }));
});


app.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const { driver_table, truck, license } = req.body;

  if (!validation(res, driver_table, 'edit/' + id)) {
    return;
  }

  let data = fs.readFileSync('./data/data.json', 'utf-8');
  data = JSON.parse(data);

  data = data.map(d => d.id === id ? {...d, driver_table, truck, license} : d);

  data = JSON.stringify(data);
  fs.writeFileSync('./data/data.json', data);

  addMessage(res, 'OK. Nice edit.', 'success');

  res.redirect(staticData.url);

});





const port = 80;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});