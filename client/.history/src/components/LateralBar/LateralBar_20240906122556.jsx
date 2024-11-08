import { lateralBarProfile } from '../../utils/const';
import './LateralBar.css';
import { NavLink } from 'react-router-dom';

export default function LateralBar() {
    return (
        <div className="">
            <aside className="">
                <ul className="flex flex-row">
                    {lateralBarProfile.map((item, i) => (
                        <NavLink
                            key={i}
                            to={item.path}
                            className={item.classNameNav}
                        >
                            <li className={item.classNameLi}>{item.name}</li>
                        </NavLink>
                    ))}
                </ul>
            </aside>
        </div>
    );
}
