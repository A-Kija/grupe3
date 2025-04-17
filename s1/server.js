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


// Get List

app.get('/inv', (req, res) => {

  const sql = `
    SELECT *
    FROM invoices
  `;

  con.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }

    // console.log(result);  
    
    const invoices = result.map(inv => (
      {
        id: inv.id,
        number: inv.number,
        date: inv.date,
        buyer: {
          company: inv.company,
          country: inv.country,
          vat: inv.vat
        },
        lines: JSON.parse(inv.invoice_lines)
      }
    ))
    
      res.status(200).json({
        status: 'success',
        list: invoices
      });
   

  });

});




// Post new invoice
app.post('/inv', (req, res) => {

  const inv = req.body;

  // console.log(inv);

  const sql = `
    INSERT INTO invoices
    (number, invoice_date, company, country, vat, invoice_lines)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  con.query(sql, [
    inv.number,
    inv.date,
    inv.buyer.company,
    inv.buyer.country,
    inv.buyer.vat,
    JSON.stringify(inv.lines)
  ], (err) => {
    if (err) {
      res.status(500).send(err);
    }

    res.status(201).json({
      status: 'success'
    });

  });
});





const port = 3000;
app.listen(port, () => {
  console.log(`Serveris klauso ${port} porto.`);
});



