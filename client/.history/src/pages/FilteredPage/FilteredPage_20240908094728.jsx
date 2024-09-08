// import ListProducts from '../../components/ListProducts/ListProducts';
// import Navbar from '../../components/Navbar/Navbar';
import { getSearchProductsService } from '../../services/fetchData';
import { useEffect, useState } from 'react';
import './FilteredPage.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { buttonStyle, categorys, productsState } from '../../utils/const.js';

export default function FilteredPage() {
    const { authUser } = useAuth();

    const navigate = useNavigate();
    const name = useLocation().search;
    const query = name.split('=').at(-1);

    const filterDefault = {
        categoria: '',
        actualPrice: 0,
        precioMax: 0,
        estado: 'all',
        localidad: 'all',
    };

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        categoria: useLocation().search,
        actualPrice: 0,
        precioMax: 0,
        estado: 'all',
        localidad: 'all',
    });
    const [filteredProducts, setFilteredProducts] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const results = await getSearchProductsService(name);

                if (
                    results.status === 'ok' &&
                    results.data !== 'No hay ningún resultado con esos filtros'
                ) {
                    const deleteItemsSelledAndSelf = results.data.filter(
                        (product) =>
                            product.isSelled === 0 &&
                            product.userId !== authUser?.id
                    );

                    setProducts(deleteItemsSelledAndSelf);
                    const maxPrice = deleteItemsSelledAndSelf.sort(
                        (a, b) => b.price - a.price
                    )[0].price;
                    const updateFilter = { ...filters };
                    updateFilter.actualPrice = Math.round(maxPrice);
                    updateFilter.precioMax = Math.round(maxPrice);
                    setFilters(updateFilter);

                    document.querySelector('.no-results').style.display =
                        'none';
                } else {
                    setProducts([]);
                    // setFilteredPrices([]);
                    document.querySelector('.no-results').style.display =
                        'block';
                }
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchProducts();
    }, [name]);

    useEffect(() => {
        const filtersProducts = [...products].filter(
            (product) =>
                product.price <= filters.actualPrice &&
                (filters.estado === 'all' ||
                    product.state === filters.estado) &&
                (filters.localidad === 'all' ||
                    product.place
                        .toLowerCase()
                        .includes(filters.localidad.toLowerCase()))
        );
        setFilteredProducts(filtersProducts);
    }, [filters]);

    const handleUpdateRangeValue = (e) => {
        const updateFilters = { ...filters };
        updateFilters.actualPrice = Math.ceil(e.target.value);
        setFilters(updateFilters);
    };

    const handleUpdateStateValue = (e) => {
        const updateFilters = { ...filters };
        updateFilters.estado = e.target.value;
        setFilters(updateFilters);
    };

    const handleUpdatePlaceValue = (e) => {
        const updateFilters = { ...filters };
        updateFilters.localidad = e.target.value;
        setFilters(updateFilters);
    };

    const handleCardClick = (e, id) => {
        e.preventDefault();
        navigate(`/product/${id}`);
    };

    return (
        <>
            <div className=" flex flex-col md:flex-row md:gap-20 w-full mt-10">
                <aside className="  h-auto p-4 md:p-0 md:w-[500px]">
                    <form className="flex flex-col justify-center items-center rounded-xl bg-slate-900 border border-slate-600  md:ml-6 md:p-10 md:gap-10 h-auto py-4 gap-4 md:w-[500px]">
                        <section className="container-aside__section_category">
                            <h3 className="filter-h3">Categorias</h3>
                            <select
                                name="select"
                                className="select-category w-full"
                                onChange={(e) =>
                                    navigate(
                                        `/search/?category=${e.target.value}`
                                    )
                                }
                            >
                                <option value="" defaultValue>
                                    Selecciona categoría
                                </option>
                                {categorys.map((v, i) => (
                                    <option
                                        key={i}
                                        value={v.value}
                                        selected={query === v.selectedValue}
                                    >
                                        {v.value}
                                    </option>
                                ))}
                            </select>
                        </section>
                        <section className="container-aside__section_price">
                            <h3 className="filter-h3">Precio</h3>
                            <input
                                type="range"
                                min="0"
                                max={filters?.precioMax}
                                step="1"
                                value={filters?.actualPrice}
                                className="range-price"
                                onChange={handleUpdateRangeValue}
                            />
                            <p className="range-price__text text-2xl text-slate-300 font-extrabold">
                                {filters?.actualPrice} €
                            </p>
                        </section>
                        <div className="container-aside__state">
                            <h3 className="filter-h3">Estado del producto</h3>
                            <select
                                name="select"
                                className="outline-none rounded-xl p-2 w-full text-center"
                                onChange={handleUpdateStateValue}
                            >
                                <option value="all" defaultValue>
                                    Selecciona estado
                                </option>
                                {productsState.map((v, i) => (
                                    <option key={i} value={v}>
                                        {v}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <section className="container-aside__state">
                            <h3 className="filter-h3">Localidad</h3>
                            <input
                                type="text"
                                className="outline-none rounded-xl p-2 w-full text-center"
                                onChange={handleUpdatePlaceValue}
                            />
                        </section>
                        <div className="container-aside__state w-4/5 ">
                            <button
                                className={buttonStyle}
                                onClick={() => setFilters(filterDefault)}
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </form>
                </aside>
                <main className="w-full flex justify-center  ">
                    <div className="w-full justify-center items-center">
                        {filteredProducts?.length > 0 && (
                            <ul className="flex flex-wrap basis-2 gap-16 w-full justify-center">
                                {filteredProducts.map((product) => (
                                    <li
                                        className="li-filtered"
                                        key={product.id}
                                        onClick={(event) =>
                                            handleCardClick(event, product.id)
                                        }
                                    >
                                        <ProductCard
                                            productName={product.productName}
                                            price={product.price}
                                            image={product.image}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {filteredProducts?.length < 1 && (
                        <div className="w-full justify-center items-center">
                            <h2 className="text-white text-xl bg-slate-900 p-6 border border-slate-600 rounded-lg w-[350px]">
                                Sin resultados
                            </h2>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
