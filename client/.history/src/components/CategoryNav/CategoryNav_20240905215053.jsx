import { categoryNav } from '../../utils/const';
import './CategoryNav.css';
import { NavLink } from 'react-router-dom';

export default function CategoryNav() {
    return (
        <>
            <div className="md:m-12 mb-10 flex justify-center over">
                <div className="category-nav__bundle w-96 ">
                    {/* <section className="category-nav ">
                        {categoryNav.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.path}
                                className="overflow-hidden"
                            >
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    className="w-10 md:w-auto "
                                />
                            </NavLink>
                        ))}
                    </section> */}
                </div>
            </div>
        </>
    );
}
