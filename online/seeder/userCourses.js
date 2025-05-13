/*
CREATE TABLE `user_courses` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED DEFAULT NULL,
  `progress` smallint(5) UNSIGNED DEFAULT NULL,
  `finished` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

import { faker } from '@faker-js/faker';


function createUserCourses(user_id, course_id, coursesPartCount, finished) {

    const { partCount } = coursesPartCount.find(c => course_id === c.course_id);

    return {
        user_id,
        course_id,
        progress: finished ? partCount : faker.number.int({ min: 1, max: partCount }),
        finished
    }
}

export default function createAllUsersCourses(usersCount, coursesPartCount, coursesCount) {

    const maxHasCourses = Math.ceil(coursesCount / 2);
    const finishedCourses = [];
    const userCourses = [];

    for (let user_id = 1; user_id <= usersCount; user_id++) {

        const hasCourses = faker.number.int({ min: 0, max: maxHasCourses });

        const coursesIds = new Set();

        while (coursesIds.size < hasCourses) {
            coursesIds.add(faker.number.int({ min: 1, max: coursesCount }))
        }

        coursesIds.forEach(course_id => {
            const finished = faker.number.int({ min: 1, max: 5 }) === 1 ? 1 : 0;
            finished && finishedCourses.push({ user_id, course_id });
            userCourses.push(createUserCourses(user_id, course_id, coursesPartCount, finished));
        });
    }

    return { finishedCourses, userCourses };

}