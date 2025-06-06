import mysql from 'mysql';
import createAllUsers from './user.js';
import createAllTopic from './topic.js';
import createAllCourses from './course.js';
import createAllParts from './part.js';
import createAllUsersCourses from './userCourses.js';
import createAllCertificates from './certificate.js';
import createAllReviews from './review.js';
import createAllPayments from './payment.js';
import createAllPartContents from './partContents.js';

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
const { finishedCourses, userCourses } = createAllUsersCourses(usersCount, coursesPartCount, coursesCount);
const certificates = createAllCertificates(finishedCourses);
const { coursesRating, reviews } = createAllReviews(userCourses);

courses.forEach((c, i) => {
    const id = i + 1;
    if (coursesRating.has(id)) {
        const { count, sum } = coursesRating.get(id);
        c.rating = (parseInt(sum / count * 100)) / 100;
    }
});

const payments = createAllPayments(users);
const partContents = createAllPartContents(parts);


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


// USER COURSES

sql = `
CREATE TABLE user_courses (
    id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id int(10) UNSIGNED NOT NULL,
    course_id int(10) UNSIGNED DEFAULT NULL,
    progress smallint(5) UNSIGNED DEFAULT NULL,
    finished int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('User_courses table error', err);
    else console.log('User_courses table OK');
});
sql = `
    INSERT INTO user_courses
    (user_id, course_id, progress, finished)
    VALUES ?
`;
con.query(sql, [userCourses.map(userCourse => [userCourse.user_id, userCourse.course_id, userCourse.progress, userCourse.finished])], (err) => {
    if (err) console.log('User_courses table seed error', err);
    else console.log('User_courses table seed OK');
});


// CERTIFICATES

sql = `
CREATE TABLE certificates (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int(10) UNSIGNED DEFAULT NULL,
  course_id int(10) UNSIGNED DEFAULT NULL,
  certificate_number varchar(32) NOT NULL,
  certificate_date date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Certificates table error', err);
    else console.log('Certificates table OK');
});
sql = `
    INSERT INTO certificates
    (user_id, course_id, certificate_number, certificate_date)
    VALUES ?
`;
con.query(sql, [certificates.map(certificate => [certificate.user_id, certificate.course_id, certificate.certificate_number, certificate.certificate_date])], (err) => {
    if (err) console.log('Certificates table seed error', err);
    else console.log('Certificates table seed OK');
});

// REVIEWS

sql = `
CREATE TABLE reviews (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int(10) UNSIGNED DEFAULT NULL,
  course_id int(10) UNSIGNED NOT NULL,
  rating tinyint(3) UNSIGNED NOT NULL,
  description text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Reviews table error', err);
    else console.log('Reviews table OK');
});
sql = `
    INSERT INTO reviews
    (user_id, course_id, rating, description)
    VALUES ?
`;
con.query(sql, [reviews.map(review => [review.user_id, review.course_id, review.rating, review.description])], (err) => {
    if (err) console.log('Reviews table seed error', err);
    else console.log('Reviews table seed OK');
});


// PAYMENTS

sql = `
CREATE TABLE payments (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int(10) UNSIGNED NOT NULL,
  plan set('free','silver','gold') NOT NULL,
  end_plan datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Payments table error', err);
    else console.log('Payments table OK');
});
sql = `
    INSERT INTO payments
    (user_id, plan, end_plan)
    VALUES ?
`;
con.query(sql, [payments.map(payment => [payment.user_id, payment.plan, payment.end_plan])], (err) => {
    if (err) console.log('Payments table seed error', err);
    else console.log('Payments table seed OK');
});


// SESSIONS

sql = `
CREATE TABLE sessions (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id int(10) UNSIGNED NOT NULL,
  token char(36) NOT NULL,
  start_time timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Sessions table error', err);
    else console.log('Sessions table OK');
});


// PARTS

sql = `
CREATE TABLE parts (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  course_id int(10) UNSIGNED NOT NULL,
  row_number tinyint(4) NOT NULL,
  title varchar(98) NOT NULL,
  description text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Parts table error', err);
    else console.log('Parts table OK');
});
sql = `
    INSERT INTO parts
    (course_id, row_number, title, description)
    VALUES ?
`;
con.query(sql, [parts.map(part => [part.course_id, part.row_number, part.title, part.description])], (err) => {
    if (err) console.log('Parts table seed error', err);
    else console.log('Parts table seed OK');
});


// PART_CONTENTS

sql = `
CREATE TABLE part_contents (
  id int(10) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  row_number tinyint(4) NOT NULL,
  video_link varchar(250) DEFAULT NULL,
  image_link varchar(250) DEFAULT NULL,
  text_block text DEFAULT NULL,
  part_id int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
con.query(sql, (err) => {
    if (err) console.log('Part_contents table error', err);
    else console.log('Part_contents table OK');
});
sql = `
    INSERT INTO part_contents
    (row_number, video_link, image_link, text_block, part_id)
    VALUES ?
`;
con.query(sql, [partContents.map(partContent => [partContent.row_number, partContent.video_link, partContent.image_link, partContent.text_block, partContent.part_id])], (err) => {
    if (err) console.log('Part_contents table seed error', err);
    else console.log('Part_contents table seed OK');
});

sql = `ALTER TABLE certificates
  ADD KEY course_id (course_id),
  ADD KEY user_id (user_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `ALTER TABLE courses
  ADD KEY teacher_id (teacher_id),
  ADD KEY topic_id (topic_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `
ALTER TABLE parts
  ADD KEY course_id (course_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `ALTER TABLE part_contents
  ADD KEY part_id (part_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `ALTER TABLE payments
  ADD KEY user_id (user_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `ALTER TABLE reviews
  ADD KEY user_id (user_id),
  ADD KEY course_id (course_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `ALTER TABLE sessions
  ADD KEY user_id (user_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `ALTER TABLE users
  ADD UNIQUE KEY email (email);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});

sql = `ALTER TABLE user_courses
  ADD KEY course_id (course_id),
  ADD KEY user_id (user_id);
`;
con.query(sql, (err) => {
    if (err) console.log('ADD KEY table error', err);
});


sql = `ALTER TABLE certificates
  ADD CONSTRAINT certificates_ibfk_1 FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE SET NULL,
  ADD CONSTRAINT certificates_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;
`;
con.query(sql, (err) => {
    if (err) console.log('Certificates table error', err);
});

sql = `ALTER TABLE courses
  ADD CONSTRAINT courses_ibfk_1 FOREIGN KEY (teacher_id) REFERENCES users (id),
  ADD CONSTRAINT courses_ibfk_2 FOREIGN KEY (topic_id) REFERENCES topics (id);
`;
con.query(sql, (err) => {
    if (err) console.log('Courses table error', err);
});

sql = `ALTER TABLE parts
  ADD CONSTRAINT parts_ibfk_1 FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) console.log('Parts table error', err);
});

sql = `ALTER TABLE part_contents
  ADD CONSTRAINT part_contents_ibfk_1 FOREIGN KEY (part_id) REFERENCES parts (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) console.log('Part_contents table error', err);
});

sql = `ALTER TABLE payments
  ADD CONSTRAINT payments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) console.log('Payments table error', err);
});

sql = `ALTER TABLE reviews
  ADD CONSTRAINT reviews_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
  ADD CONSTRAINT reviews_ibfk_2 FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) console.log('Reviews table error', err);
});

sql = `ALTER TABLE sessions
  ADD CONSTRAINT sessions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) console.log('Sessions table error', err);
});

sql = `ALTER TABLE user_courses
  ADD CONSTRAINT user_courses_ibfk_1 FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE SET NULL,
  ADD CONSTRAINT user_courses_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
`;
con.query(sql, (err) => {
    if (err) console.log('User_courses table error', err);
});


con.end();
console.log('Disconnecting from DB.');
console.log('End DB seeding.');