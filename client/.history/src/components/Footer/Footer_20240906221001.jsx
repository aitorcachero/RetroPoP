import { footerSocialMedia } from '../../utils/const';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="left_side">
                <div className="flex flex.row">
                    {footerSocialMedia.map((v, i) => (
                        <a
                            key={i}
                            href={v.path}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={v.img} alt={v.alt} width={32} />
                        </a>
                    ))}
                </div>
            </div>

            <div className="right_side">
                <div className="footer__logo">
                    <img src="/logo-retropop.png" alt="logo" width="32" />
                </div>
                <p className="p-footer text-xs md: text-base">
                    &copy; {`Retropop ${new Date().getFullYear()}`}
                </p>
            </div>
        </footer>
    );
}
