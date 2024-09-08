import getListProductsModel from '../../models/products/getListProductsModel.js';

const getListProductsController = async (req, res, next) => {
    try {
        const products = await getListProductsModel();
        console.log('AQUIIIIII', products);

        res.send({
            status: 'ok',
            data: products,
        });
    } catch (err) {
        next(err);
    }
};

export default getListProductsController;
