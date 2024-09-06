import { categoryNav } from '../../utils/const';
import './CategoryNav.css';
import { NavLink } from 'react-router-dom';

export default function CategoryNav() {
    return (
        <>
            <div className="md:m-12 mb-10 flex justify-center">
                <div className="category-nav__bundle overflow-hidden ">
                    <section className="category-nav overflow-hidden">
                        {categoryNav.map((item, i) => (
                            <NavLink key={i} to={item.path}>
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    className="w-10 md:w-auto"
                                />
                            </NavLink>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
}
