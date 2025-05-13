/*
CREATE TABLE `certificates` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `course_id` int(10) UNSIGNED DEFAULT NULL,
  `certificate_number` varchar(32) NOT NULL,
  `certificate_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

import { faker } from '@faker-js/faker';

function createCertificate(user_id, course_id) {

    return {
        user_id,
        course_id,
        certificate_number: faker.phone.imei(),
        certificate_date: faker.date.past({ years: 2 })
    }
}

export default function createAllCertificates(finishedCourses) {

    const certificates = [];

    finishedCourses.forEach(c => {
        certificates.push(createCertificate(c.user_id, c.course_id));
    });

    return certificates;
}