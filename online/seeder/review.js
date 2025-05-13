/*
CREATE TABLE `reviews` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

import { faker } from '@faker-js/faker';

function createReview(user_id, course_id, rating) {

    return {
        user_id,
        course_id,
        rating,
        description: faker.food.description()
    }

}


export default function createAllReviews(userCourses) {

    const coursesRating = new Map();

    const reviews = [];

    userCourses.forEach(uc => {

        if (faker.number.int({ min: 1, max: 4 }) === 1) {

            const rating = faker.number.int({ min: 1, max: 5 });

            if (!coursesRating.has(uc.course_id)) {
                coursesRating.set(uc.course_id, { count: 1, sum: rating });
            } else {
                const newCount = coursesRating.get(uc.course_id).count + 1;
                const newSum = coursesRating.get(uc.course_id).sum + rating;
                coursesRating.set(uc.course_id, { count: newCount, sum: newSum })
            }

            reviews.push(createReview(user_id, course_id, rating));

        }

    });

    return { coursesRating, reviews };

}