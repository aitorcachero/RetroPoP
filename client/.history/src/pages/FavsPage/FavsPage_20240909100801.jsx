import LateralBar from '../../components/LateralBar/LateralBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { getAllProductsService } from '../../services/fetchData';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function ProductsActivePage() {
    const { authFavs, loading, setLoading } = useAuth();

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // setLoading(true);
                const body = await getAllProductsService();
                setProducts(body.data);
            } catch (err) {
                console.log(err.message);
            } finally {
                // setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleCardClick = async (e, key) => {
        e.preventDefault();
        navigate(`/product/${key}`);
    };

    return (
        <section className="list-products-active flex flex-col justify-center items-center w-full">
            <div className="w-full h-12">
                <LateralBar />
            </div>
            <div className="w-full bg-slate-900 border-y border-slate-600 m-10 flex justify-center items-center p-6">
                <div className="font-extrabold text-2xl md:text-6xl text-slate-400">
                    Favoritos
                </div>
            </div>
            <div className="list-products__container-active w-full">
                <ul className="flex flex-1 flex-wrap gap-20 justify-center items-center">
                    {products &&
                        products
                            .filter((product) => {
                                if (authFavs?.includes(product.id))
                                    return product;
                            })
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
                </ul>
            </div>
        </section>
    );
}

// .filter((product) => {
//                                 if (authFavs?.includes(product.id))
//                                     return product;
//                                 console.log(authFavs?.includes(product.id));
//                             })
