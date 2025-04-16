import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();

// For parsing application/json
app.use(express.json());

// use CORS to allow cross-origin requests
app.use(cors());



const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inv',
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Valio prisijungėme prie buhalterijos!');
});



const port = 3000;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});



