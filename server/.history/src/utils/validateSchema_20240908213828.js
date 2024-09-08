// Función que se encargará de validar un esquema de datos.
const validateSchema = async (schema, data) => {
    try {
        await schema.validateAsync(data);
    } catch (err) {
        err.httpStatus = 400;
        return {
            status: 'error',
            message: 'Solo se permiten fotos jpeg, bmp, png o webp',
        };
    }
};

export default validateSchema;
