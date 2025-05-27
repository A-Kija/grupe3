import express from 'express';
import mysql from 'mysql';
// import fs from 'node:fs';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
  database: 'online'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected to ONLINE DB');
});

const dbError = (res, err) => {
  if (err) {
    res.status(500).send({
      success: false,
      message: err
    });
    return true;
  }
  return false;
}

// Topics List
app.get('/topics-list', (req, res) => {
  const sql = `
    SELECT id, title, topic_type AS topicType
    FROM topics
    `;
      con.query(sql, (err, result) => {
      if (dbError(res, err)) return; 
      res.json({
        success: true,
        topics: result
      });
    });
});


// Courses List
app.get('/courses-list/:topicId', (req, res) => {

  const topicId = parseInt(req.params.topicId);

  const sql = `
    SELECT c.id, title, description, teacher_id AS teacherId, req_plan AS plan, u.name AS teacherName
    FROM courses AS c
    INNER JOIN users AS u
    ON u.id = c.teacher_id
    WHERE c.topic_id = ?
    `;
      con.query(sql, [topicId], (err, result) => {
      if (dbError(res, err)) return; 
      res.json({
        success: true,
        courses: result
      });
    });
});

// Course Parts
app.get('/course/:courseId', (req, res) => {

  const courseId = parseInt(req.params.courseId);

    const sql = `
      SELECT id, row_number AS row, title, description
      FROM parts
      WHERE course_id = ?
      ORDER BY row_number
    `;
      con.query(sql, [courseId], (err, result) => {
      if (dbError(res, err)) return; 
      res.json({
        success: true,
        course: result
      });
    });
});

// Part Content
app.get('/part/:partId', (req, res) => {

  const partId = parseInt(req.params.partId);

    const sql = `
      SELECT c.id, c.row_number AS row, c.video_link AS video, c.part_id AS partId,
       c.image_link AS image, c.text_block AS textBlock, p.row_namber AS partNumber,
       p.title AS partTitle, cr.title AS courseTitle
      FROM part_contents AS c
      INNER JOIN parts AS p
      ON c.part_id = p.id
      INNER JOIN courses AS cr
      ON p.course_id = cr.id
      WHERE c.part_id = ?
      ORDER BY c.row_number

    `;
      con.query(sql, [partId], (err, result) => {
      if (dbError(res, err)) return; 
      res.json({
        success: true,
       part: result
      });
    });
});









const port = 3000;
app.listen(port, () => {
  console.log(`Server on ${port} port.`);
});

