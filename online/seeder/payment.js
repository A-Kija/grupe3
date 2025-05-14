/*

CREATE TABLE `payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `plan` set('free','silver','gold') NOT NULL,
  `end_plan` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

*/

import { faker } from '@faker-js/faker';

function createPayment(user_id, isRoleFree) {

    const days = faker.number.int({ min: 1, max: 30 });
    let end_plan;
    if (faker.number.int({ min: 0, max: 2 })) {
        end_plan = faker.date.soon({ days });
    } else {
        end_plan = faker.date.recent({ days });
    }

    return {
        user_id,
        plan: isRoleFree ? 'free' : faker.helpers.arrayElement(['silver', 'gold']),
        end_plan: isRoleFree ? null : end_plan
    }

}

export default function createAllPayments(users) {

    const payments = [];

    users.forEach((u, i) => {
        const id = i + 1;
        const userRole = u.role;
        if (userRole === 'free' || userRole === 'subscriber') {
            payments.push(createPayment(id, userRole === 'free'));
        }
    });

    return payments;

}