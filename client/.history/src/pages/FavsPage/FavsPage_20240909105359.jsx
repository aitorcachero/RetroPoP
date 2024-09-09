import LateralBar from '../../components/LateralBar/LateralBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { getAllProductsService } from '../../services/fetchData';
import useAuth from '../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function ProductsActivePage() {
    const { authFavs, loading, setLoading } = useAuth();

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const body = await getAllProductsService();
                setProducts(
                    body.data.filter((product) => {
                        if (authFavs?.includes(product.id)) return product;
                    })
                );
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
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
                        products.map((product) => (
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
                    {products.length === 0 && !loading && (
                        <div className="flex flex-col justify-center items-center w-[350px] md:w-[800px] shadow-xl shadow-black bg-slate-900 border border-slate-600 p-6 ">
                            <h2 className="text-white md:text-xl  p-6 rounded-lg  text-center">
                                Todavía no has vendido ningún producto en
                                RetroPoP
                            </h2>
                            <div className="w-full flex justify-center items-center">
                                <NavLink
                                    to="/upload"
                                    className="w-full md:w-auto"
                                >
                                    <button
                                        className="w-full md:w-[230px] md:h-[60px] p-2 text-xs md:text-lg shadow-xl shadow-black border border-slate-500 rounded-lg bg-slate-800 hover:bg-green-600 text-slate-400 hover:text-white min-h-12"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <p className="  font-bold">
                                            SUBIR PRODUCTO
                                        </p>
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    )}
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