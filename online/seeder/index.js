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

const { users, teachersIds, adminId, editorId } = createAllUsers();


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

// USERS
sql = `
    CREATE TABLE users (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email varchar(98) NOT NULL,
    name varchar(54) NOT NULL,
    password char(32) NOT NULL,
    role set('subscriber','free','admin','editor','teacher') NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Users table error', err);
    else console.log('Users table OK');
});

sql = `
    INSERT INTO users
    (email, name, password, role)
    VALUES ?
`;

con.query(sql, [], (err) => {
    if (err) console.log('Users table seed error', err);
    else console.log('Users table seed OK');
});







con.end();
console.log('Disconnecting from DB.');
console.log('End DB seeding.');