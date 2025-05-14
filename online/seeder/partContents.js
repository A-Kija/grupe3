/*

CREATE TABLE `part_contents` (
  `id` int(10) UNSIGNED NOT NULL,
  `row_number` tinyint(4) NOT NULL,
  `video_link` varchar(250) DEFAULT NULL,
  `image_link` varchar(250) DEFAULT NULL,
  `text_block` text DEFAULT NULL,
  `part_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

*/

const url = '';

import { faker } from '@faker-js/faker';

function createPartContent(row_number, part_id) {
    const type = faker.number.int({ min: 1, max: 6 });
    let video = null, image = null, text = null;
    if (type <= 3) {
        text = faker.word.words({ count: { min: 10, max: 300 } });
    } else if(type <= 5) {
        const number = ('' + faker.number.int({ min: 1, max: 10 })).padStart(2, '0');
        image = url + 'image-' + number + '.jpg';
    } else {
        video = 'video';
    }

    return {
        row_number,
        video_link: video,
        image_link: image,
        text_block:  text,
        part_id
    }
}

export default function createAllPartContents(parts) {

    const partContents = [];

    parts.forEach((_, i) => {
        const part_id = i + 1;
        const rows = faker.number.int({ min: 2, max: 23 });

        for (let row_number = 1; row_number <= rows; row_number++) {
            partContents.push(createPartContent(row_number, part_id));
        }
        
    });

    return partContents;

}