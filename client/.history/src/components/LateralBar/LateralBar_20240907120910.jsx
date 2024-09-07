import { lateralBarProfile } from '../../utils/const';
import './LateralBar.css';
import { NavLink } from 'react-router-dom';

export default function LateralBar() {
    return (
        <nav className="w-full h-full">
            <ul className="flex flex-row h-full">
                {lateralBarProfile.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className="flex w-full font-bold"
                    >
                        <li className="lateral-bar__list__item text-xs md:text-base md:font-bold">
                            {item.name}
                        </li>
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}
