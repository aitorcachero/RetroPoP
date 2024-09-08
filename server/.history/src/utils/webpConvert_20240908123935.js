import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

import { UPLOADS_DIR } from '../config.js';

export default async function webpConvert(name) {
    const convert = await imagemin([`${UPLOADS_DIR}/avatar/${name}`], {
        destination: `${UPLOADS_DIR}/avatar`,
        plugins: [imageminWebp({ quality: 75 })],
    });

    console.log('Images optimized', convert);
}

console.log('Images optimized');
