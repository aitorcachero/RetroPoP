import './ProductCardProfile.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';

export default function ProductCardProfile({ image, productName, price }) {
    return (
        <div className="product-card-container w-[350px] md:w-[220px] h-[420px] md:h-[320px]">
            <article className="product-card w-full md:w-[218px] h-full">
                <div className="product-card__image-container w-[300px] md:w-[180px] ">
                    <img
                        className="product-card__image"
                        src={`${APIUrl}/images/${image}`}
                        alt="product"
                    />
                </div>
                <main className="product-card__main">
                    <h3 className="product-card__name text-xl">
                        {productName}
                    </h3>
                </main>
                <footer className="product-card__footer">
                    <p className="product-card__price text-orange-600">
                        {price}€
                    </p>
                </footer>
            </article>
        </div>
    );
}

ProductCardProfile.PropTypes = {
    product: productPropTypes,
};
