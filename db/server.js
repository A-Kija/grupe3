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

  // SELECT column1, column2, ...
  // FROM table_name;

  const sql = `
    SELECT id, title, height, type
    FROM trees
    -- WHERE type = 'Lapuotis' OR height > 10
    ORDER BY type DESC, height
  `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('KLAIDA!');
    }

    res.send(template({
      trees: result
    }));

  });

});

app.post('/plant', (req, res) => {

  const { title, height, type } = req.body;

  // INSERT INTO table_name (column1, column2, column3, ...)
  // VALUES (value1, value2, value3, ...);

  // NESAUGU, taip daryti NEGALIMA !!!!!!!!!!!!!!!!

  const sql = `
  INSERT INTO trees
  (title, height, type)
  VALUES ('${title}', ${height}, '${type}')
`;

  con.query(sql, (err) => {
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