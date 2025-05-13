import { faker } from '@faker-js/faker';
import mysql from 'mysql';
import createAllUsers from './user.js';
import createAllTopic from './topic.js';
import createAllCourses from './course.js';
import createAllParts  from './part.js';

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

const { users, teachersIds, adminId, editorId, usersCount } = createAllUsers();
const { topics, topicsCount } = createAllTopic();
const { courses, coursesCount } = createAllCourses(teachersIds, topicsCount);
const { coursesPartCount, parts } = createAllParts(coursesCount);


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

con.query(sql, [users.map(user => [user.email, user.name, user.password, user.role])], (err) => {
    if (err) console.log('Users table seed error', err);
    else console.log('Users table seed OK');
});

// TOPICS

sql = `
CREATE TABLE topics (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(98) NOT NULL,
  topic_type set('Programming','Design','Cyber Security','Gaming') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Topics table error', err);
    else console.log('Topics table OK');
});
sql = `
    INSERT INTO topics
    (title, topic_type)
    VALUES ?
`;
con.query(sql, [topics.map(topic => [topic.title, topic.topic_type])], (err) => {
    if (err) console.log('Topics table seed error', err);
    else console.log('Topics table seed OK');
});


// COURSES

sql = `
CREATE TABLE courses (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title varchar(200) NOT NULL,
    description text NOT NULL,
    teacher_id int(11) UNSIGNED NOT NULL,
    topic_id int(11) UNSIGNED NOT NULL,
    req_plan set('free','silver','gold') NOT NULL,
    rating decimal(3,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Courses table error', err);
    else console.log('Courses table OK');
});
sql = `
    INSERT INTO courses
    (title, description, teacher_id, topic_id, req_plan, rating)
    VALUES ?
`;
con.query(sql, [courses.map(course => [course.title, course.description, course.teacher_id, course.topic_id, course.req_plan, course.rating])], (err) => {
    if (err) console.log('Couirses table seed error', err);
    else console.log('Courses table seed OK');
});






con.end();
console.log('Disconnecting from DB.');
console.log('End DB seeding.');