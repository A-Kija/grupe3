/*
CREATE TABLE `parts` (
  `id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `row_number` tinyint(4) NOT NULL,
  `title` varchar(98) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

import { faker } from '@faker-js/faker';


function createPart(course_id, row_number) {

    return {
        course_id,
        row_number,
        title: faker.food.dish(),
        description: faker.word.words({ count: { min: 5, max: 40 } }),
    }

}

export default function createAllParts(coursesCount) {

    const coursesPartCount = [];
    const parts = [];

    for (let course_id = 1; course_id <= coursesCount; course_id++) {
        const partCount = faker.number.int({ min: 2, max: 22 });
        coursesPartCount.push({ course_id, partCount });
        for (let row_number = 1; row_number <= partCount; row_number++) {
            parts.push(createPart(course_id, row_number));
        }
    }
    return { coursesPartCount, parts }
}