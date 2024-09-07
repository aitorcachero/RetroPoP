import { lateralBarProfile } from '../../utils/const';
import './LateralBar.css';
import { NavLink } from 'react-router-dom';

export default function LateralBar() {
    return (
        <nav className="w-full h-full bg-slate-800">
            <ul className="flex flex-row h-full">
                {lateralBarProfile.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className="flex w-full justify-center items-center font-bold"
                    >
                        <li className="text-white flex justify-center items-center text-xs md:text-base md:font-bold">
                            {item.name}
                        </li>
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}
