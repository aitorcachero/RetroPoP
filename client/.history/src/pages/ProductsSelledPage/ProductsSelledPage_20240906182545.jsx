import LateralBar from '../../components/LateralBar/LateralBar';
import { useEffect, useState } from 'react';
import { getAllProductsService } from '../../services/fetchData';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ProductCardProfile from '../../components/ProductCardProfile/ProductCardProfile';

export default function ProductsSelledPage() {
    const { authUser } = useAuth();

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
        <section className="list-products-active flex flex-col  justify-center items-center w-full">
            <div className="w-full h-12">
                <LateralBar />
            </div>
            <h2 className="title-active font-extrabold text-6xl">
                Productos vendidos
            </h2>
            <div className="list-products__container-active w-full">
                <ul className="flex flex-1 flex-wrap gap-20 justify-center items-center">
                    {products &&
                        products
                            .filter(
                                (product) =>
                                    product.isSelled === 1 &&
                                    product.userId === authUser?.id
                            )
                            .map((product) => (
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
                </ul>
            </div>
        </section>
    );
}
