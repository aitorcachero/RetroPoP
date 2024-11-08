import { categoryNav } from '../../utils/const';
import './CategoryNav.css';
import { NavLink } from 'react-router-dom';

export default function CategoryNav() {
    return (
        <>
            <div className="category-nav-container">
                <div className="category-nav__bundle">
                    <section className="category-nav">
                        {categoryNav.map((item, i) => (
                            <NavLink key={i} to={item.path}>
                                <img src={item.img} alt="icono" width="80" />
                            </NavLink>
                        ))}
                        {/* <NavLink
                            to="/search/?category=audio"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/audio.png"
                                alt="audio"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=camaras"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/camaras.png"
                                alt="camaras"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=consolas"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/consolas.png"
                                alt="consolas"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=juguetes"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/juguetes.png"
                                alt="juguetes"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=Maquinas de escribir"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/maquinas-escribir.png"
                                alt="maquinas-escribir"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=Ordenadores"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/ordenadores.png"
                                alt="ordenadores"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=Relojes"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/relojes.png"
                                alt="relojes"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=Telefonos"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/telefonos.png"
                                alt="telefonos"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=Televisores"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/televisores.png"
                                alt="televisores"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=Video"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/video.png"
                                alt="video"
                                width="80"
                            />
                        </NavLink>
                        <NavLink
                            to="/search/?category=Otros"
                            className="category-nav__link"
                        >
                            <img
                                src="/icons/otros.png"
                                alt="otros"
                                width="80"
                            />
                        </NavLink> */}
                    </section>
                </div>
            </div>
        </>
    );
}
