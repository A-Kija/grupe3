import express from 'express';
import Handlebars from 'handlebars';
import mysql from 'mysql';
import fs from 'node:fs';

const app = express();
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_garden'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Valio prisijungėme prie sodo!');
});

// Listas

app.get('/', (req, res) => {

  const html = fs.readFileSync('./garden.hbs', 'utf8');
  const template = Handlebars.compile(html);
  const sort = req?.query?.sort ?? '';
  let orderQuery;

  switch (sort) {
    case 'id-asc':
      orderQuery = 'ORDER BY id';
      break;
    case 'id-desc':
      orderQuery = 'ORDER BY id DESC';
      break;
    case 'height-asc':
      orderQuery = 'ORDER BY height';
      break;
    case 'height-desc':
      orderQuery = 'ORDER BY height DESC';
      break;
    case 'title-asc':
      orderQuery = 'ORDER BY title';
      break;
    case 'title-desc':
      orderQuery = 'ORDER BY title DESC';
      break;
   default:
      orderQuery = 'ORDER BY type, height';
  }

  // SELECT column1, column2, ...
  // FROM table_name;

  const sql = `
    SELECT id, title, height, type
    FROM trees
    -- WHERE type = 'Lapuotis' OR height > 10
    ${orderQuery}
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('KLAIDA!');
    }


    const sql1 = `
      SELECT SUM(height) AS sum, COUNT(height) AS count, MIN(height) AS min, MAX(height) AS max, AVG(height) AS average
      FROM trees
    `;

    con.query(sql1, (err1, result1) => {
      if (err1) {
        console.log(err1);
        res.status(500).send('KLAIDA!');
      }

      res.send(template({
        trees: result,
        ...result1[0]
      }));
    });
  });

});

app.post('/plant', (req, res) => {

  const { title, height, type } = req.body;

  // INSERT INTO table_name (column1, column2, column3, ...)
  // VALUES (value1, value2, value3, ...);

  const sql = `
  INSERT INTO trees
  (title, height, type)
  VALUES (?, ?, ?)
`;

  con.query(sql, [title, height, type], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('KLAIDA!');
    }

    res.redirect('http://localhost:3000/');
  });

});


app.post('/cut', (req, res) => { // metodas delete, bet prastinam
  const { id } = req.body; // reiktu perdavideti kaip parametra ne body, bet prastinam

  // DELETE FROM table_name WHERE condition;

  const sql = `
    DELETE FROM trees
    -- WHERE id = 888 OR 1
    WHERE id = ?
  `;

  con.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('KLAIDA!');
    }

    res.redirect('http://localhost:3000/');
  });
});

app.post('/water', (req, res) => {
  const { id, height } = req.body;

  // UPDATE table_name
  // SET column1 = value1, column2 = value2, ...
  // WHERE condition;

  const sql = `
    UPDATE trees
    SET height = ?
    WHERE id = ?
  `;

  con.query(sql, [height, id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('KLAIDA!');
    }

    res.redirect('http://localhost:3000/');
  });

});

const port = 3000;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});



/*
Padaryti pagal pateiktą pavyzdį my_movies (gali būti my_garden db)
id
title
ganre (comedy, sci-fi, drama)
length
statistika visa
rūšiavimai pagal žanrą, pavadinimą ir ilgį
*/