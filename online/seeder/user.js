/*
CREATE TABLE `users` (
    `id` int(10) UNSIGNED NOT NULL,
    `email` varchar(98) NOT NULL,
    `name` varchar(54) NOT NULL,
    `password` char(32) NOT NULL,
    `role` set('subscriber','free','admin','editor','teacher') NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

import { faker } from '@faker-js/faker';
import md5 from 'md5';


function createUser() {

  return {
    email: faker.internet.email(),
    name: faker.internet.username(),
    password: md5('123'),
    role: faker.helpers.arrayElement(['subscriber','free'])
  }
}

function createUserTeacher() {

  return {
    email: faker.internet.email(),
    name: faker.internet.username(),
    password: md5('123'),
    role: 'teacher'
  }
}

function createUserAdmin(name) {

  return {
    email: name + '@gmail.com',
    name: name,
    password: md5('123'),
    role: 'admin'
  }
}

function createUserEditor(name) {

  return {
    email: name + '@gmail.com',
    name: name,
    password: md5('123'),
    role: 'editor'
  }
}

export default function createAllUsers() {
  const users = [];
  const usersCount = 52;
  const teachersCount = 7;

  for (let i = 0; i < usersCount; i++) {
      users.push(createUser());
  }

  for (let i = 0; i < teachersCount; i++) {
      users.push(createUserTeacher());
  }

  users.push(createUserAdmin('briedis'));
  users.push(createUserEditor('bebras'));

  return {
    users,
    teachersIds: [usersCount + 1, usersCount + 1 + teachersCount],
    adminId: usersCount + 2 + teachersCount,
    editorId: usersCount + 3 + teachersCount,
  }
}