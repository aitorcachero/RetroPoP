import './ProductCard.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';

import useAuth from '../../hooks/useAuth';

export default function ProductCard({ image, productName, price, fav }) {
    const { authUser } = useAuth();

    return (
        <div className="product-card-container">
            <article className="product-card w-[350px]">
                <div className="product-card__image-container">
                    <img
                        className="product-card__image"
                        src={`${APIUrl}/images/${image}`}
                        alt="product"
                    />
                </div>
                <main className="product-card__main">
                    <h3 className="product-card__name">{productName}</h3>
                </main>
                <footer className="product-card__footer">
                    <p className="product-card__price">{price}€</p>
                    {authUser && (
                        <img
                            className="product-card__button"
                            alt="fav"
                            src={
                                fav ? '/icons/heart2.png' : '/icons/heart1.png'
                            }
                        />
                    )}
                </footer>
            </article>
        </div>
    );
}

ProductCard.PropTypes = {
    product: productPropTypes,
};
