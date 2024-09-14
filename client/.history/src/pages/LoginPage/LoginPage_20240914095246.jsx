import './LoginPage.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userNameRegisterRegex } from '../../utils/regex.js';
// import {
//     loginUserService,
//     registerUserService,
// } from '../../services/fetchData.js';

// import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth.js';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner.jsx';

export default function LoginPage() {
    const { authRegister, authLogin } = useAuth();
    const [loading, setLoading] = useState(false);

    // const toastError = (errMsg) => toast.error(errMsg);
    // const toastSuccess = (msg) => toast.success(msg);

    const signinClick = () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.add('animate-signUp');
        wrapper.classList.remove('animate-signIn');
    };

    const singupClick = () => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.classList.add('animate-signIn');
        wrapper.classList.remove('animate-signUp');
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (!userNameRegisterRegex.test(e.target[0].value)) {
                return toast.error(
                    'El nombre de usuario tiene que tener entre 4 y 20 carácteres'
                );
            }

            authRegister({
                username: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value,
                repeatedPass: e.target[3].value,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const LoginSubmit = async (e) => {
        e.preventDefault();
        // try {
        authLogin({
            email: e.target[0].value,
            password: e.target[1].value,
        });

        // const data = {
        //     email: e.target[0].value,
        //     password: e.target[1].value,
        // };

        //     const user = await loginUserService(data.email, data.password);
        //     if (user.status === 'ok') {
        //         localStorage.setItem(user.data.username, user.data.token);
        //     }
        //     toast.success(`Bienvenido ${user.data.username}`);
        //     user.status === 'error'
        //         ? toastError(user.message)
        //         : toastSuccess(user.message);
        // } catch (error) {
        //     error.message === 'Failed to fetch'
        //         ? toastError('Error de conexión')
        //         : toastError(error.message);
        // }
    };

    const [passReg, setPassReg] = useState('password');
    const [passRepeatReg, setPassRepeatReg] = useState('password');
    const [passLog, setPassLog] = useState('password');
    const [imgPassReg, setImgPassReg] = useState('icons/eye-open.png');
    const [imgPassRepeatReg, setImgPassRepeatReg] =
        useState('icons/eye-open.png');
    const [imgPassLog, setImgPassLog] = useState('icons/eye-open.png');
    const [passRegLength, setPassRegLength] = useState(0);
    const [passRepeatRegLength, setPassRepeatRegLength] = useState(0);
    const [passLogLength, setPassLogLength] = useState(0);

    const handleClickEyePassReg = () => {
        setPassReg(passReg === 'password' ? 'text' : 'password');
        setImgPassReg(
            imgPassReg === 'icons/eye-open.png'
                ? 'icons/eye-close.png'
                : 'icons/eye-open.png'
        );
    };

    const handleClickEyePassRepeatReg = () => {
        setPassRepeatReg(passRepeatReg === 'password' ? 'text' : 'password');
        setImgPassRepeatReg(
            imgPassRepeatReg === 'icons/eye-open.png'
                ? 'icons/eye-close.png'
                : 'icons/eye-open.png'
        );
    };

    const handleClickEyePassLog = () => {
        setPassLog(passLog === 'password' ? 'text' : 'password');
        setImgPassLog(
            imgPassLog === 'icons/eye-open.png'
                ? 'icons/eye-close.png'
                : 'icons/eye-open.png'
        );
    };

    return (
        <>
            <div className="container-login">
                <div className="wrapper mt-40 relative w-[320px] h-[500px] md:w-[500px] md:h-[500px]">
                    <div className="form-wrapper sign-up bg-slate-900 border border-slate-600 text-white">
                        <form action="" onSubmit={registerSubmit}>
                            <h2 className="text-white">Registro</h2>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input type="text" required />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input type="text" required />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    type={passReg}
                                    onChange={(e) =>
                                        setPassRegLength(e.target.value.length)
                                    }
                                    required
                                    className="input-pass-reg md:w-[320px] w-[220px]"
                                ></input>
                                {passRegLength > 2 && (
                                    <img
                                        onClick={handleClickEyePassReg}
                                        className="eye"
                                        src={imgPassReg}
                                        alt="eye"
                                        width="30"
                                        loading="lazy"
                                    />
                                )}
                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    type={passRepeatReg}
                                    onChange={(e) =>
                                        setPassRepeatRegLength(
                                            e.target.value.length
                                        )
                                    }
                                    required
                                />
                                {passRepeatRegLength > 2 && (
                                    <img
                                        onClick={handleClickEyePassRepeatReg}
                                        className="eye"
                                        src={imgPassRepeatReg}
                                        alt="eye"
                                        width="30"
                                        loading="lazy"
                                    />
                                )}
                                <label htmlFor="">Repite la contraseña</label>
                            </div>
                            <button type="submit" className="btn">
                                Registro
                            </button>
                            <div className="sign-link">
                                <p>
                                    ¿Ya tienes una cuenta?{' '}
                                    <a
                                        href="#"
                                        className="signIn-link"
                                        onClick={signinClick}
                                    >
                                        Entra
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="form-wrapper sign-in  bg-slate-900 border border-slate-600 text-white">
                        <form action="" onSubmit={LoginSubmit}>
                            <h2 className="text-white">Login</h2>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    type="text"
                                    className="border border-slate-600"
                                    required
                                />

                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    className="border border-slate-600"
                                    type={passLog}
                                    onChange={(e) =>
                                        setPassLogLength(e.target.value.length)
                                    }
                                    required
                                />
                                {passLogLength > 2 && (
                                    <img
                                        onClick={handleClickEyePassLog}
                                        className="eye"
                                        src={imgPassLog}
                                        alt="eye"
                                        width="30"
                                        loading="lazy"
                                    />
                                )}

                                <label htmlFor="">Contraseña</label>
                            </div>
                            <div className="forgot-pass">
                                <a href="#" className="">
                                    ¿Has olvidado la contraseña?
                                </a>
                            </div>
                            <button type="submit" className="btn text-black">
                                {loading ? <LoaderSpinner /> : 'Entra'}
                            </button>
                            <div className="sign-link">
                                <p>
                                    ¿No tienes una cuenta?{' '}
                                    <a
                                        href="#"
                                        className="signUp-link"
                                        onClick={singupClick}
                                    >
                                        ¡Registrate!
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
