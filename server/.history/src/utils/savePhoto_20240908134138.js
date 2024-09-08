// Importamos las dependencias.
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import sharp from 'sharp';

// Importamos la constante que contiene el nombre del directorio de subida de archivos.
import { UPLOADS_DIR } from '../../config.js';
// import webpConvert from './webpConvert.js';
import deletePhoto from './deletePhoto.js';

// Importamos las funciones de error.

// Función que se encargará de guardar una imagen en el disco en la cuál recibe tres parametros.
// 1. La imagen. 2. El ancho de la imagen. 3. El nombre de la carpeta en la que se guardará la imagen (Solo puede ser "avatars" para el avatar de los perfiles o "images" para las imágenes de los productos)
const savePhoto = async (img, name, folder) => {
    // const resize = folder === 'images' ? 300 : 800;
    const dirname = path.dirname(url.fileURLToPath(import.meta.url));

    try {
        // Creamos la ruta absoluta al directorio de subida de archivos.
        const uploadsPath = path.join(dirname, '..', UPLOADS_DIR);
        const imagesPath = path.join(uploadsPath, folder);

        try {
            // El método "access" lanza un error si la ruta especificada no existe.
            console.log('checkFirst');
            const checkDir = await fs.access(uploadsPath);
            console.log('checkSecond', checkDir);
        } catch {
            // Si no existe entraremos en este catch y crearemos el directorio.
            await fs.mkdir(uploadsPath);
        }
        // Convertimos la imagen a un objeto tipo Sharp para poder redimensionarla.
        const sharpImg = sharp(img.data);
        // Redimensionamos la imagen. El parámetro "width" representa un ancho en píxeles.
        // sharpImg.resize(resize);

        // Generamos la ruta absoluta a la imagen.
        const imgPath = path.join(uploadsPath, name);
        // Guardamos la imagen en el disco.
        // await sharpImg.toFile(imgPath);
        // Convertimos la imagen a webp.
        const imgWebp = sharpImg.webp({ quality: 75 });
        // Guardamos la imagen en el disco.
        await imgWebp.toFile(imgPath);

        // await deletePhoto(name, 'images');

        return name;
    } catch (err) {
        console.error(err);
    }
};

export default savePhoto;
