import './ProductCardProfile.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';

export default function ProductCardProfile({ image, productName, price }) {
    return (
        <article className="w-[350px] md:w-[250px] h-[420px] md:h-[350px] bg-slate-900 flex flex-col justify-center items-center rounded-lg p-4 shadow-xl shadow-black border border-slate-600 cursor-pointer">
            <div className="product-card__image-container w-[300px] md:w-[180px] border border-slate-600 shadow-lg shadow-black  ">
                <img
                    className="product-card__image"
                    src={`${APIUrl}/images/${image}`}
                    alt="product"
                />
            </div>
            <main className="product-card__main">
                <h3 className="product-card__name text-xl md:text-base">
                    {productName}
                </h3>
            </main>
            <footer className="product-card__footer">
                <p className="product-card__price text-orange-500 font-extrabold">
                    {price}€
                </p>
            </footer>
        </article>
    );
}

ProductCardProfile.PropTypes = {
    product: productPropTypes,
};
