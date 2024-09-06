import { categoryNav } from '../../utils/const';
import './CategoryNav.css';
import { NavLink } from 'react-router-dom';

export default function CategoryNav() {
    return (
        <>
            <div className="category-nav-container">
                <div className=" w-96 h-96 ">
                    <section className="category-nav">
                        {categoryNav.map((item, i) => (
                            <NavLink key={i} to={item.path}>
                                <img src={item.img} alt={item.alt} width="80" />
                            </NavLink>
                        ))}
                    </section>
                </div>
            </div>
        </>
    );
}
