import './ListProducts.css';
import { useState, useEffect } from 'react';

import { getAllProductsService } from '../../services/fetchData.js';
import ProductCard from '../ProductCard/ProductCard';
import { productPropTypes } from '../../utils/customPropTypes';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import Loader from '../Loader/Loader.jsx';

export default function ListProducts() {
    const { authUser, authFavs } = useAuth();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [favs, setFavs] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const body = await getAllProductsService();
                setProducts(body.data);
                setFavs(authFavs);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [favs, authFavs]);

    const handleCardClick = async (e, key) => {
        e.preventDefault();
        navigate(`/product/${key}`);
    };

    return (
        <section className="list-products">
            <div className="list-products__container w-full flex flex-col justify-center items-center">
                <div className="w-[600px] bg-slate-900 opacity-50 backdrop-blur-md z-50">
                    <input
                        type="text"
                        className="w-full outline-none border rounded-lg p-2 text-center bg-slate-500"
                    />
                </div>
                <ul className="flex flex-1 flex-wrap gap-20 justify-center items-center mb-20 md:p-10">
                    {products &&
                        products
                            .filter(
                                (product) =>
                                    product.isSelled === 0 &&
                                    product.userId !== authUser?.id
                            )
                            .map((product) => (
                                <li
                                    key={product.id}
                                    onClick={(event) =>
                                        handleCardClick(event, product.id)
                                    }
                                >
                                    <ProductCard
                                        productName={product.productName}
                                        price={product.price}
                                        image={product.image}
                                        fav={
                                            authFavs?.includes(product.id)
                                                ? true
                                                : false
                                        }
                                    />
                                </li>
                            ))}

                    {loading && <Loader />}
                </ul>
            </div>
        </section>
    );
}

ListProducts.PropTypes = {
    product: productPropTypes,
};
