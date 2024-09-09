import './ProductBigCard.css';
import { productPropTypes } from '../../utils/customPropTypes';
import { APIUrl } from '../../config';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts.js';
import { toast } from 'react-toastify';
import { setFavoriteService } from '../../services/fetchData';
import { deleteProductService } from '../../services/fetchData';
import { buttonStyle } from '../../utils/const.js';

export default function ProductBigCard({ product }) {
    const [fav, setFav] = useState(false);
    const { authToken, authFavs, authUser } = useAuth();
    // const [loading, setLoading] = useState(false);
    const { addBooking } = useProducts();
    const [showPopUp, setShowPopUp] = useState(false);
    const [showPopUpDelete, setShowPopUpDelete] = useState(false);

    const dateNow = new Date(product.createdAt)
        .toDateString()
        .split(' ')
        .splice(1);

    const dateNowFormatted = `${dateNow[1]} ${dateNow[0]} ${dateNow[2]}`;

    const navigate = useNavigate();

    useEffect(() => {
        authFavs?.includes(product?.id) ? setFav(true) : setFav(false);
    }, [authFavs, product?.id]);

    const handleBookingCreate = async (e) => {
        e.preventDefault();

        if (!authToken) {
            toast.error('Debes estar logueado para reservar un producto');
            return navigate('/login');
        }
        setShowPopUp(true);
    };

    const confirmBooking = (e) => {
        e.preventDefault();

        addBooking(product.id);
    };

    const cancelBooking = (e) => {
        e.preventDefault();
        setShowPopUp(false);
    };

    const handleFavSubmit = async (e) => {
        e.preventDefault();
        if (!authToken) {
            toast.error('Debes estar logueado para añadir un favorito');
            return navigate('/login');
        }

        const setFavorite = await setFavoriteService(authToken, product?.id);

        toast.success(setFavorite.message);

        setFav(!fav);
    };

    const deleteHandleSubmit = async (e) => {
        e.preventDefault();
        setShowPopUpDelete(true);
    };

    const confirmDelete = async (e) => {
        try {
            e.preventDefault();
            if (!authToken) {
                toast.error('Debes estar logueado para borrar un producto');
                return navigate('/login');
            }
            const deleteProduct = await deleteProductService(
                authToken,
                product.id
            );

            if (deleteProduct.status === 'ok') {
                toast.success(deleteProduct.message);
                navigate('/');
            } else {
                toast.error(deleteProduct.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cancelDelete = (e) => {
        e.preventDefault();
        setShowPopUpDelete(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        navigate(`/product/edit/${product.id}`);
    };

    return (
        <div className="product-big-card p-4">
            <article className="product-page   my-4 md:min-w-[800px] bg-slate-900 shadow-xl shadow-black border border-slate-600">
                <header className="w-full bg-slate-800 p-4">
                    <div className="product-page__header__user">
                        <div className="product-page__header__user__name">
                            <img
                                className="product_page_avatar"
                                src={
                                    product.avatar
                                        ? `${APIUrl}/avatars/${product?.avatar}`
                                        : '/icons/acceso.png'
                                }
                                alt="user"
                                loading="lazy"
                            />
                            <h3 className="h3-bigproduct md:text-2xl font-extrabold text-slate-300">
                                {product?.username}
                            </h3>
                            {product.userSellerId === authUser?.id &&
                                product.isSelled === 0 && (
                                    <button
                                        className="product-delete__button"
                                        onClick={deleteHandleSubmit}
                                    >
                                        Borrar producto
                                    </button>
                                )}
                            {showPopUpDelete && (
                                <div className="popup  bg-slate-900 border border-slate-600 text-white">
                                    <p className="popup-p">
                                        ¿Estás segur@ de que quieres eliminar
                                        este producto?
                                    </p>
                                    <button
                                        onClick={confirmDelete}
                                        className="popup-button"
                                    >
                                        Confirmar
                                    </button>
                                    <button
                                        onClick={cancelDelete}
                                        className="popup-button"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="product-page__header__user__reviews">
                            <h3 className="h3-bigproduct md:text-2xl font-extrabold text-slate-300">
                                {product?.totalReviews > 0
                                    ? `${product?.mediaStars?.toFixed(
                                          1
                                      )} estrellas (
                                ${product?.totalReviews} reviews)`
                                    : 'Este usuario no tiene reviews'}
                            </h3>
                        </div>
                        <div className="product-page__header__user__creation">
                            <p className="p-product-created md:text-lg">
                                Fecha de creación:
                                <span className=" text-orange-600">
                                    {` ${dateNowFormatted}`}
                                </span>
                            </p>
                        </div>
                    </div>
                </header>
                <div className="m-4 flex flex-col justify-center items-center gap-4 p-4">
                    <img
                        src={`${APIUrl}/images/${product?.image}`}
                        alt=""
                        className="w-[250px] rounded-xl border border-slate-600 shadow-lg shadow-black object-cover"
                        loading="lazy"
                    />
                    <div className="flex flex-row justify-center items-center">
                        <h2 className="text-blue-500 text-center font-bold text-lg md:text-xl">
                            {product?.productName}
                        </h2>
                    </div>
                    <div className="product-page__info__description max-w-[600px]">
                        <p className="md:text-sm text-xs text-white text-center">
                            {product?.description}
                        </p>
                    </div>
                    <h3 className="text-center text-blue-500 text-4xl font-extrabold ">
                        {product?.price}€
                    </h3>
                </div>

                <footer className="flex flex-col gap-6 w-full justify-center items-center p-4 bg-slate-800">
                    <div className=" text-slate-300 flex flex-row justify-around w-full font-bold md:text-base text-sm">
                        <NavLink to={`/search/?category=${product?.category}`}>
                            <h3 className="">#{product?.category}</h3>
                        </NavLink>
                        <NavLink to={`/search/?place=${product?.place}`}>
                            <h3 className="">{product?.place}</h3>
                        </NavLink>
                        <NavLink to={`/search/?state=${product?.state}`}>
                            <h3 className="">{product?.state}</h3>
                        </NavLink>
                    </div>
                    <div className="flex flex-row gap-6 w-[300px] h-12 md:h-full md:w-full justify-around ">
                        {product.isSelled === 0 &&
                            product.userSellerId !== authUser?.id && (
                                <button
                                    className={buttonStyle}
                                    onClick={handleBookingCreate}
                                >
                                    Reservar
                                </button>
                            )}
                        {showPopUp && (
                            <div className="popup flex flex-col w-[330px] bg-slate-900 border border-slate-600 text-white gap-4 p-10 font-bold">
                                <p className="popup-p">
                                    ¿Estás segur@ de que quieres reservar este
                                    producto?
                                </p>
                                <div className="flex flex-row gap-4">
                                    <button
                                        onClick={confirmBooking}
                                        className={buttonStyle}
                                    >
                                        Confirmar
                                    </button>
                                    <button
                                        onClick={cancelBooking}
                                        className={buttonStyle}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                        {product.isSelled === 0 &&
                            product.userSellerId !== authUser?.id && (
                                <button
                                    className={buttonStyle}
                                    onClick={handleFavSubmit}
                                >
                                    <span className="flex justify-center items-center">
                                        <img
                                            className="md:w-12 w-6 "
                                            src={
                                                authToken && fav
                                                    ? '/icons/heart2.png'
                                                    : '/icons/heart1.png'
                                            }
                                            loading="lazy"
                                        />
                                    </span>
                                </button>
                            )}
                        {product.isSelled === 0 &&
                            product.userSellerId === authUser?.id && (
                                <button
                                    className={buttonStyle}
                                    onClick={handleEditSubmit}
                                >
                                    Editar
                                </button>
                            )}
                    </div>
                </footer>
            </article>
        </div>
    );
}

ProductBigCard.propTypes = {
    product: productPropTypes,
};
