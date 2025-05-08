import { faker } from '@faker-js/faker';
import mysql from 'mysql';
import createAllUsers from './user.js';

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

const {users, teachersIds, adminId, editorId} = createAllUsers();


let sql;

console.log('Connecting to DB.');

// DROPS
const drops = [
    'part_contents',
    'parts',
    'sessions',
    'payments',
    'reviews',
    'certificates',
    'user_courses',
    'courses',
    'topics',
    'users'
];


drops.forEach(table => {
    sql = `DROP TABLE IF EXISTS ${table}`;
    con.query(sql, (err) => {
        if (err) {
            console.log(`${table} table drop error`, err);
            return;
        }
        console.log(`${table} table was dropped`);
    });
});







con.end();
console.log('Disconnecting from DB.');
console.log('End DB seeding.');