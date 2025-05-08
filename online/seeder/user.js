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


export function createUser() {

  return {
    email: faker.internet.email(),
    name: faker.internet.username(),
    password: md5('123'),
    role: faker.helpers.arrayElement(['subscriber','free'])
  }
}

export function createUserTeacher() {

  return {
    email: faker.internet.email(),
    name: faker.internet.username(),
    password: md5('123'),
    role: 'teacher'
  }
}

export function createUserAdmin(name) {

  return {
    email: name + '@gmail.com',
    name: name,
    password: md5('123'),
    role: 'admin'
  }
}

export function createUserEditor(name) {

  return {
    email: name + '@gmail.com',
    name: name,
    password: md5('123'),
    role: 'editor'
  }
}