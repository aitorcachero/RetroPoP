import { categoryNav } from '../../utils/const';
import './CategoryNav.css';
import { NavLink } from 'react-router-dom';

export default function CategoryNav() {
    return (
        <>
            <div className="category-nav-container">
                <div className="category-nav__bundle w-[350px] md:w-[auto] ">
                    <section className="flex justify-evenly items-center rounded">
                        {categoryNav.map((item, i) => (
                            <NavLink key={i} to={item.path}>
                                <img
                                    src={item.img}
                                    alt={item.alt}
                                    width="auto"
                                />
                            </NavLink>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
}
