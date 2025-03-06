import {faker} from '@faker-js/faker';
import {v4 as uuid4} from 'uuid';
import fs from 'node:fs';

let data = [];

for (let i = 0; i < 20; i++) {
    data.push({
        id: uuid4(),
        driver_table: faker.person.fullName({
            sex: faker.helpers.arrayElement(['female', 'male'])
        }),
        truck: '' + faker.number.int({ min: 1, max: 7 }),
        license: '' + faker.number.int({ min: 0, max: 1 }),
    });
}

  data = JSON.stringify(data); // verciam i json stringa

  fs.writeFileSync('./data/data.json', data); // rasom i faila