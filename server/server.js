const express = require('express');
const app = express();
const fs = require('node:fs');
const Handlebars = require('handlebars');
const cookieParser = require('cookie-parser');

// public folder
app.use(express.static('public'));

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Router

//   http://localhost:3500/gauti-zebra 3500
//   http://localhost/gauti-zebra 80


app.get('/gauti-zebra', (req, res) => {

  const skaiciavimas = 20 * 30;
  const zebroVardas = '3 Jonas';
  const zebroHtml = fs.readFileSync('./public/zebro-gavimo-failas.html', 'utf8'); // čia ne URL!

  const template = Handlebars.compile(zebroHtml);

  const resultHtml = template(
    {
      kintamasis: skaiciavimas,
      zv: zebroVardas
    }
  );

  res.send(resultHtml);

});

app.post('/forma', (req, res) => {

  const {spalva, dydis} = req.body; // gaunam iš formos pasiimame iš body

  const sausainioData = JSON.stringify({spalva, dydis: dydis + 'px'}); // duomenys paverčiam stringu

  res.cookie('Sausainis', sausainioData); // stringą pavadiname vardu ir siunčiame kaip sausainį
  res.redirect('http://localhost/forma');
});

app.get('/forma', (req, res) => {

  // const spalva = 'skyblue';
  // const dydis = '20px';

  let spalva, dydis;

  let gautasSausainis = req.cookies.Sausainis; // sausainis kaip JSON pasiimam iš request

  gautasSausainis = JSON.parse(gautasSausainis); // sausainis kaip objektas

  spalva = gautasSausainis.spalva;
  dydis = gautasSausainis.dydis;

  const formosFailas = fs.readFileSync('./public/forma.hbs', 'utf8');

  const template = Handlebars.compile(formosFailas);

  res.send(template({
    pavadinimas: 'Mano puiki forma',
    url: 'http://localhost/forma',
    spalva,
    dydis
  }));

});






app.get('/', (req, res) => {
  res.send('Labas, Bebrai!');
});

app.get('/zebras/:spalva/:dydis', (req, res) => {

  // const { spalva, dydis } = req.params;
  const spalva = req.params.spalva;
  const dydis = req.params.dydis;
  res.send(`<h1 style="color:${spalva}; font-size:${dydis};"> Labas, Zebras! Tavo spalva yra ${spalva}, o dydis ${dydis}.</h1>`);

});

app.get('/briedis', (req, res) => {
  const spalva = req.query.spalva;
  const dydis = req.query.dydis;
  res.send(`<h1 style="color:${spalva}; font-size:${dydis};"> Labas, Briedi! Tavo spalva yra ${spalva}, o dydis ${dydis}.</h1>`);
});

app.get('/suma/:s1/:s2', (req, res) => {
  const { s1, s2 } = req.params;
  const suma = parseInt(s1) + parseInt(s2);
  res.send(`Rezultatas: ${suma}`);
});

app.get('/skirtumas', (req, res) => {
  const { s1, s2 } = req.query;
  const skirtumas = parseInt(s1) - parseInt(s2);
  res.send(`Rezultatas: ${skirtumas}`);
});



const port = 80;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});


// http://localhost:3500/suma/2/3 padaryti, sumatorių su dviem parametrais skaičiais, kuris rodo atsakymą - sumą.

// Tas pat tik skaičiai perduodami per query string. http://localhost:3500/skirtumas?s1=2&s2=3