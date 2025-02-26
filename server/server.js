const express = require('express');
const app = express();

// public folder
app.use(express.static('public'));


// Router

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



const port = 3500;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});


// http://localhost:3500/suma/2/3 padaryti, sumatorių su dviem parametrais skaičiais, kuris rodo atsakymą - sumą.

// Tas pat tik skaičiai perduodami per query string. http://localhost:3500/skirtumas?s1=2&s2=3