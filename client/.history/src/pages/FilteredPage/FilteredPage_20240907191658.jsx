// import ListProducts from '../../components/ListProducts/ListProducts';
// import Navbar from '../../components/Navbar/Navbar';
import {
    getSearchProductsService,
    getAllProductsService,
} from '../../services/fetchData';
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

    // const [maxPrice, setMaxPrice] = useState(); // [1
    const [products, setProducts] = useState([]);
    // const [valuePrice, setValuePrice] = useState(maxPrice);
    const [filters, setFilters] = useState({
        categoria: useLocation().search,
        actualPrice: 0,
        precioMax: 0,
        estado: '',
        localidad: '',
    });
    // const [filteredPrice, setFilteredPrices] = useState();

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const body = await getAllProductsService();
    //             const maxPrice = Math.ceil(
    //                 body.data.sort((a, b) => b.price - a.price)[0].price
    //             );

    //             setMaxPrice(maxPrice);
    //             setValuePrice(maxPrice);
    //             setProducts(body.data);
    //             console.log(products);
    //         } catch (err) {
    //             console.log(err.message);
    //         }
    //     };
    //     fetchProducts();
    // }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const results = await getSearchProductsService(name);

                if (
                    results.status === 'ok' &&
                    results.data !== 'No hay ningún resultado con esos filtros'
                ) {
                    setProducts(results.data);
                    const maxPrice = results.data.sort(
                        (a, b) => b.price - a.price
                    )[0].price;
                    const updateFilter = { ...filters };
                    updateFilter.actualPrice = maxPrice;
                    updateFilter.precioMax = maxPrice;
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
        console.log(filters);
    }, [filters]);

    const handleUpdateRangeValue = (e) => {
        const updateFilters = { ...filters };
        updateFilters.actualPrice = e.target.value;
        setFilters(updateFilters);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const data = `?category=${e.target[0].value}&maxPrice=${e.target[1].value}&state=${e.target[2].value}&place=${e.target[3].value}`;

    //     navigate(`/search/${data}`);
    // };

    // const handleCardClick = async (e, key) => {
    //     e.preventDefault();
    //     navigate(`/product/${key}`);
    // };

    // const resetEventHandle = (e) => {
    //     e.preventDefault();
    //     document.querySelector('.select-category').value = '';
    //     document.querySelector('.range-price').value = `${maxPrice}`;
    //     document.querySelector(
    //         '.range-price__text'
    //     ).textContent = `${maxPrice}`;
    //     document.querySelector('.select-state').value = '';
    //     document.querySelector('.search-location').value = '';
    //     setValuePrice(maxPrice);
    // };

    // const handleChangeValuePrice = (e) => {
    //     setValuePrice(e.target.value);

    //     // setFilteredPrices(products.filter((x) => x.price < e.target.value));
    // };

    const handleCardClick = () => {};

    const handleSubmit = () => {};

    const handleChangeValuePrice = () => {};

    const resetEventHandle = () => {};
    // const handleCategory = (e) => {
    //     const newFilter = { ...filters };
    //     newFilter.categoria = e.target.value;
    //     setFilters(newFilter);
    // };

    return (
        <>
            <div className=" flex flex-col md:flex-row md:gap-20 w-full mt-10">
                <aside className="  h-auto p-4 md:w-[500px]">
                    <form
                        className="flex flex-col justify-center items-center rounded-xl bg-slate-900 border border-slate-600  md:ml-6 md:p-10 md:gap-10 h-auto py-4 gap-4 md:w-[500px]"
                        onSubmit={handleSubmit}
                    >
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
                                className="outline-none rounded-xl p-2 w-full"
                            >
                                <option value="" defaultValue>
                                    Selecciona estado
                                </option>
                                {productsState.map(v, (i) => (
                                    <option value={v}>{v}</option>
                                ))}
                                {/* <option value="Nuevo">Nuevo</option>
                                <option value="Como nuevo">Como nuevo</option>
                                <option value="En buen estado">
                                    En buen estado
                                </option>
                                <option value="En condiciones aceptables">
                                    En condiciones aceptables
                                </option>
                                <option value="No funciona">No funciona</option> */}
                            </select>
                        </div>
                        <section className="container-aside__state">
                            <h3 className="filter-h3">Localidad</h3>
                            <input
                                type="text"
                                className="outline-none rounded-xl p-2 w-full"
                            />
                        </section>
                        <div className="container-aside__buttons w-full p-4">
                            <button
                                className={buttonStyle}
                                onClick={resetEventHandle}
                            >
                                Limpiar filtros
                            </button>
                            <button type="submit" className={buttonStyle}>
                                Aplicar filtros
                            </button>
                        </div>
                    </form>
                </aside>
                <main className="w-full justify-center items-center ">
                    <div className="w-full justify-center items-center">
                        {products.length > 0 && (
                            <ul className="flex flex-wrap basis-2 gap-16 w-full justify-center">
                                {[...products]
                                    .filter(
                                        (product) =>
                                            product.isSelled === 0 &&
                                            product.userId !== authUser?.id
                                    )
                                    .map((product) => (
                                        <li
                                            className="li-filtered"
                                            key={product.id}
                                            onClick={(event) =>
                                                handleCardClick(
                                                    event,
                                                    product.id
                                                )
                                            }
                                        >
                                            <ProductCard
                                                productName={
                                                    product.productName
                                                }
                                                price={product.price}
                                                image={product.image}
                                            />
                                        </li>
                                    ))}
                            </ul>
                        )}

                        <h2 className="no-results">Sin resultados</h2>
                    </div>
                </main>
            </div>
        </>
    );
}
