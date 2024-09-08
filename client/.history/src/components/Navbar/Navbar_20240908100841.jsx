import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { APIUrl } from '../../config';
import { useState } from 'react';

const Navbar = () => {
    const { authToken, authUser, authLogout } = useAuth();

    // Aquí vamos a hacer pruebas

    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(!showMenu);

    // Aquí terminan las pruebas

    const navigate = useNavigate();
    const handleSubmitSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/?name=${e.target.value}`);
        }
    };

    const handleClickHome = () => {
        document.querySelector('.search-form').value = '';
        navigate('/');
    };

    const handleClickLogin = (e) => {
        e.stopPropagation();
        toggleMenu();
        document.querySelector('.search-form').value = '';
        navigate('/login');
    };

    const handleClickAvatar = (e) => {
        e.stopPropagation();
        toggleMenu();
    };

    const handleClickProfile = (e) => {
        e.stopPropagation();
        toggleMenu();
        navigate('/profile');
    };

    return (
        <>
            <nav className="navbar shadow-xl shadow-black bg-slate-900">
                <img
                    src="/logo-retropop.png"
                    className="w-16 md:w-32"
                    alt=""
                    onClick={handleClickHome}
                    style={{ cursor: 'pointer' }}
                />

                <input
                    type="text"
                    className="search-form md:w-1/2 w-48 h-12 md:h-14"
                    placeholder="Busca tu producto aquí..."
                    onKeyDown={handleSubmitSearch}
                />

                {authToken && (
                    <NavLink to="/upload" className="">
                        <button
                            className="upload-product md:w-[230px] md:h-[60px] p-2 text-xs md:text-lg shadow-xl shadow-black border border-slate-500"
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src="/icons/add-product.png"
                                alt=""
                                className="w-8 md:w-12"
                            />{' '}
                            <p className="hidden md:block">Subir producto</p>
                        </button>
                    </NavLink>
                )}

                {!authUser ? (
                    <img
                        className="user w-12 h-12 md:w-14 md:h-14"
                        src="/icons/login.png"
                        onClick={handleClickLogin}
                    ></img>
                ) : (
                    <div>
                        <img
                            onClick={handleClickAvatar}
                            className="user w-12 h-12 md:w-14 md:h-14"
                            src={
                                authUser.avatar
                                    ? `${APIUrl}/avatars/${authUser.avatar}`
                                    : '/icons/acceso.png'
                            }
                            alt="Avatar"
                        />

                        {showMenu && (
                            <div
                                className="dropdown-menu right-0 md:right-20 w-44 bg-slate-900 text-white  border border-slate-600 h-24 flex flex-col justify-center items-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ul className="w-full flex-col justify-center">
                                    <div className="hover:bg-slate-800">
                                        <li
                                            onClick={handleClickProfile}
                                            className="w-full"
                                        >
                                            Ver perfil
                                        </li>
                                    </div>

                                    <div className="hover:bg-slate-800">
                                        <li
                                            onClick={authLogout}
                                            className="w-full"
                                        >
                                            Cerrar sesión
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
