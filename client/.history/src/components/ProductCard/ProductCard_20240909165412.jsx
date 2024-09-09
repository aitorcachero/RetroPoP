import './ProductCard.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';

import useAuth from '../../hooks/useAuth';

export default function ProductCard({ image, productName, price, fav }) {
    const { authUser } = useAuth();

    return (
        <article className="w-[350px] md:w-[250px] h-[420px] md:h-[350px] bg-slate-900 flex flex-col justify-center items-center rounded-lg p-4 shadow-xl shadow-black border border-slate-600 cursor-pointer">
            <div className="product-card__image-container w-[300px] md:w-[180px] border border-slate-600 shadow-lg shadow-black  ">
                <img
                    className="w-full h-full "
                    src={`${APIUrl}/images/${image}`}
                    alt="product"
                    loading="lazy"
                />
            </div>
            <main className="product-card__main">
                <h3 className="product-card__name text-xl md:text-base">
                    {productName}
                </h3>
            </main>
            <footer className="product-card__footer text-center w-full">
                <p className="product-card__price text-center text-orange-500 font-extrabold">
                    {price}€
                </p>
                {authUser && (
                    <img
                        className="product-card__button"
                        alt="fav"
                        src={fav ? '/icons/heart2.png' : '/icons/heart1.png'}
                        loading="lazy"
                    />
                )}
            </footer>
        </article>
    );
}

ProductCard.PropTypes = {
    product: productPropTypes,
};
