import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

// Use CORS to allow cross-origin requests
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// For parsing application/json
app.use(express.json());

// Cookies
app.use(cookieParser());



const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Valio prisijungėme prie autorizacijos DB!');
});


app.get('/get-count', (req, res) => {

  let counts = req.cookies.visitsCount || 0;
  counts = parseInt(counts);
  counts++;
  res.cookie('visitsCount', counts, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // stringą pavadiname vardu ir siunčiame kaip sausainį

  res.json({
    status: 'OK',
    counts
  });

});



const port = 3000;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});

// Identifikacija - vartotojo atpažinimas (pavyzdžiui "Smagusis Meškėnas") naudojant indentifikatorių (pvz slaptažodis).
// Autentifikacija - vartotojo atpažinas (pavyzdžiui "Arvydas Kijakauskas a/s 11111") naudojant autentifikacijos priemones (pvz mobilus parašas, Smart ID).
// Autorizacija - nusako ką gali daryti indentifikuotas arba autentifikuotas vartotojas. (dažniausiai yra sudaroma "rolių" principu)



