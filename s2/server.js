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

app.post('/logout', (req, res) => {

  const id = req.user.id; // gautas is auth middleware

  const sql = `
    DELETE FROM sessions
    WHERE user_id = ?
  `;

  con.query(sql, [id], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.clearCookie('authToken');
    res.json({
      success: true,
      message: {
        type: 'success',
        text: 'Logged out'
      }
    });
  });
});

app.put('/user-data', (req, res) => {

  const userId = req.user.id;
  const color = req.body.color;
  const pet = req.body.pet;
  const userData = JSON.stringify({ color, pet });

  const sql = `
    UPDATE users
    SET user_data = ?
    WHERE id = ?
  `;
  con.query(sql, [userData, userId], (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({
      success: true,
      message: {
        type: 'success',
        text: 'Data was updated'
      }
    });
  });

});

app.get('/user-data', (req, res) => {

  const userId = req.user.id;

  if (userId === 0) {
    res.status(401).json({
      success: false,
      message: {
        type: 'error',
        text: 'Not authorized'
      }
    });
    return;
  }

  const sql = `
    SELECT user_data
    FROM users
    WHERE id = ?
  `;
  con.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({
      success: true,
      userData: JSON.parse(result[0].user_data)
    });
  });
});

app.get('/admin-get-users', (req, res) => {


  const sql = `
    SELECT *
    FROM users
  `;

  con.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    result = result.map(r => ({...r, password: null, user_data: JSON.parse(r.user_data)}));

    res.json({
      success: true,
      usersData: result
    });
  });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});

// Identifikacija - vartotojo atpažinimas (pavyzdžiui "Smagusis Meškėnas") naudojant indentifikatorių (pvz slaptažodis).
// Autentifikacija - vartotojo atpažinas (pavyzdžiui "Arvydas Kijakauskas a/s 11111") naudojant autentifikacijos priemones (pvz mobilus parašas, Smart ID).
// Autorizacija - nusako ką gali daryti indentifikuotas arba autentifikuotas vartotojas. (dažniausiai yra sudaroma "rolių" principu)



