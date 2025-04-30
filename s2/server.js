import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import md5 from 'md5';
import { v4 } from 'uuid';


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

// MIDDLEWARE
app.use((req, res, next) => {

  const token = req.cookies.authToken;

  if (!token) {
    req.user = {
      id: 0
    }
    next();
  } else {
    const sql = `
      SELECT u.id, u.email AS name, u.role
      FROM sessions AS s
      INNER JOIN users AS u
      ON u.id = s.user_id
      WHERE s.token = ?
    `;
    con.query(sql, [token], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (!result.length) {
        req.user = {
          id: 0
        }
      } else {
        req.user = {
          id: result[0].id,
          name: result[0].name,
          role: result[0].role
        }
      }
      next();
    });
  }
});


// ROUTER

app.get('/get-user', (req, res) => {

  res.json({
    success: req.user.id === 0 ? false : true,
    user: req.user
  });

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


app.post('/register', (req, res) => {

  setTimeout(_ => {

    const email = req.body.name;
    const password = md5(req.body.password); // reiketu naudoti labiau siuolaikini hasinima

    // tikriname emailo unikaluma
    const sql1 = `
  SELECT id
  FROM users
  WHERE email = ?
  `;

    con.query(sql1, [email], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (result.length) { // toks emailas rastas, vadinasi neunikalus
        res.json({
          success: false,
          message: {
            type: 'error',
            text: 'Email already exists'
          }
        });
      } else { // nera tokio, registruojam
        const sql2 = `
        INSERT INTO users
        (email, password)
        VALUES (?, ?)
      `;
        con.query(sql2, [email, password], (err) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res.json({
            success: true,
            message: {
              type: 'ok',
              text: 'Registered'
            }
          });
        });
      }
    });
  }, 1500);
});

app.post('/login', (req, res) => {

  const email = req.body.name;
  const password = md5(req.body.password); // reiketu naudoti labiau siuolaikini hasinima

  const sql1 = `
    SELECT *
    FROM users
    WHERE email = ? AND password = ?
  `;

  con.query(sql1, [email, password], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (!result.length) { // emailas arba slaptazodis blogas
      res.json({
        success: false,
        message: {
          type: 'error',
          text: 'Email or password is invalid'
        }
      });
    } else { // viskas ok

      

      const token = v4(); // reiketu naudoti kriptografiniu algoritmu paremta generavima
      const user_id = result[0].id;

      const sql2 = `
      INSERT INTO sessions
      (token, user_id)
      VALUES (?, ?)
      `;

      con.query(sql2, [token, user_id], (err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }

        res.cookie('authToken', token, { maxAge: 1000 * 60 * 60 * 24 }); // siunciame tokena kaip kuki
        res.json({
          success: true,
          message: {
            type: 'success',
            text: 'Logged in'
          },
          user: {
            name: result[0].email,
            id: result[0].id,
            role: result[0].role
          }
        });
      });
    }
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});

// Identifikacija - vartotojo atpažinimas (pavyzdžiui "Smagusis Meškėnas") naudojant indentifikatorių (pvz slaptažodis).
// Autentifikacija - vartotojo atpažinas (pavyzdžiui "Arvydas Kijakauskas a/s 11111") naudojant autentifikacijos priemones (pvz mobilus parašas, Smart ID).
// Autorizacija - nusako ką gali daryti indentifikuotas arba autentifikuotas vartotojas. (dažniausiai yra sudaroma "rolių" principu)



