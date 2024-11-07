import LateralBar from '../../components/LateralBar/LateralBar';
import { useEffect, useState } from 'react';
import { getAllProductsService } from '../../services/fetchData';
import useAuth from '../../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import ProductCardProfile from '../../components/ProductCardProfile/ProductCardProfile';
import Loader from '../../components/Loader/Loader';
import { profileBarStyle } from '../../utils/const';

export default function ProductsSelledPage() {
    const { authUser } = useAuth();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const body = await getAllProductsService();
                setProducts(
                    body.data.filter(
                        (product) =>
                            product.isSelled === 1 &&
                            product.userId === authUser?.id
                    )
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
        <section className="list-products-active flex flex-col  justify-center items-center w-full">
            <LateralBar />

            <h2 className={profileBarStyle}>Productos vendidos</h2>

            <div className="list-products__container-active w-full">
                <ul className="flex flex-1 flex-wrap gap-20 justify-center items-center mb-20 md:p-10">
                    {products &&
                        products.map((product) => (
                            <li
                                key={product.id}
                                onClick={(event) =>
                                    handleCardClick(event, product.id)
                                }
                            >
                                <ProductCardProfile
                                    productName={product.productName}
                                    price={product.price}
                                    image={product.image}
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