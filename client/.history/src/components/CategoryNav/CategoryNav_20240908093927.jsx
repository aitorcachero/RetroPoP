import { categoryNav } from '../../utils/const';
import './CategoryNav.css';
import { NavLink } from 'react-router-dom';

export default function CategoryNav() {
    return (
        <>
            <div className=" mb-10 md:mb-0 flex justify-center p-4">
                <section className="category-nav flex flex-1 flex-wrap md:flex-nowrap gap-2 p-2 bg-slate-900 border border-slate-600 md:p-4">
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
                </section>
            </div>
        </>
    );
}
