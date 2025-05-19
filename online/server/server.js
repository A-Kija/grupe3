import express from 'express';
import mysql from 'mysql';
// import fs from 'node:fs';
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
  database: 'online'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected to ONLINE DB');
});

// Listas

app.get('/clients', (req, res) => {

});




const port = 3000;
app.listen(port, () => {
  console.log(`Server on ${port} port.`);
});

