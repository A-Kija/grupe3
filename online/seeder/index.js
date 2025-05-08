import { faker } from '@faker-js/faker';
import mysql from 'mysql';

console.log('Start db seeding.');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'online',
    port: 3306
});

con.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
});

let sql;

console.log('Connecting to DB.');

// DROPS

sql = 'DROP TABLE IF EXISTS users';
con.query(sql, (err) => {
    if (err) {
        console.log('User table drop error', err);
        return;
    }
    console.log('User table was dropped');
});




con.end();
console.log('Disconnecting from DB.');
console.log('End DB seeding.');