import { lateralBarProfile } from '../../utils/const';
import './LateralBar.css';
import { NavLink } from 'react-router-dom';

export default function LateralBar() {
    return (
        <nav className="w-full bg-slate-800 min-h-16 border-b border-slate-600">
            <ul className="flex flex-row flex-1 flex-wrap md:flex-nowrap h-full">
                {lateralBarProfile.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className="flex md:w-full justify-center items-center font-bold hover:bg-slate-700"
                    >
                        <li className="text-white flex justify-center items-center text-xs md:text-base font-extralight md:font-bold">
                            {item.name}
                        </li>
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}
