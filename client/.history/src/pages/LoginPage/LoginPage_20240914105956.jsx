import './LoginPage.css';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { userNameRegisterRegex } from '../../utils/regex.js';
import EYEOPEN from '/public/icons/eye-open.png';
import EYECLOSE from '/public/icons/eye-close.png';

import useAuth from '../../hooks/useAuth.js';
import LoaderSpinner from '../../components/LoaderSpinner/LoaderSpinner.jsx';

export default function LoginPage() {
    const { authRegister, authLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef();
    const passReg = useRef();
    const passRepeatReg = useRef();
    const passLog = useRef();

    const [imgPassReg, setImgPassReg] = useState('icons/eye-open.png');
    const [imgPassRepeatReg, setImgPassRepeatReg] =
        useState('icons/eye-open.png');
    const [imgPassLog, setImgPassLog] = useState('icons/eye-open.png');
    const [passVisible, setPassVisible] = useState({
        passReg: false,
        passRepeatReg: false,
        passLog: false,
    });
    const [registerObject, setRegisterObject] = useState({
        username: '',
        email: '',
        password: '',
        repeatedPass: '',
    });
    const [loginObject, setLoginObject] = useState({
        email: '',
        password: '',
    });

    const signinClick = () => {
        wrapperRef?.current.classList.add('animate-signUp');
        wrapperRef?.current.classList.remove('animate-signIn');
    };

    const singupClick = () => {
        wrapperRef?.current.classList.add('animate-signIn');
        wrapperRef?.current.classList.remove('animate-signUp');
    };

    const registerSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            if (!userNameRegisterRegex.test(e.target[0].value)) {
                return toast.error(
                    'El nombre de usuario tiene que tener entre 4 y 20 carácteres'
                );
            }

            await authRegister(registerObject);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await authLogin(loginObject);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container-login">
                <div
                    className="wrapper mt-40 relative w-[320px] h-[500px] md:w-[500px] md:h-[500px]"
                    ref={wrapperRef}
                >
                    <div className="form-wrapper sign-up bg-slate-900 border border-slate-600 text-white">
                        <form action="" onSubmit={registerSubmit}>
                            <h2 className="text-white">Registro</h2>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    type="text"
                                    required
                                    value={registerObject.username}
                                    onChange={(e) => {
                                        const updateOpject = {
                                            ...registerObject,
                                        };
                                        updateOpject.username = e.target.value;
                                        setRegisterObject(updateOpject);
                                    }}
                                />
                                <label htmlFor="">Usuario</label>
                            </div>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    type="text"
                                    required
                                    value={registerObject.email}
                                    onChange={(e) => {
                                        const updateOpject = {
                                            ...registerObject,
                                        };
                                        updateOpject.email = e.target.value;
                                        setRegisterObject(updateOpject);
                                    }}
                                />
                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    type="password"
                                    value={registerObject.password}
                                    onChange={(e) => {
                                        const updateOpject = {
                                            ...registerObject,
                                        };
                                        updateOpject.password = e.target.value;
                                        setRegisterObject(updateOpject);
                                    }}
                                    required
                                    ref={passReg}
                                    className="input-pass-reg md:w-[320px] w-[220px]"
                                ></input>
                                {registerObject.password.length > 2 && (
                                    <img
                                        onClick={() =>
                                            passReg?.current.type === 'password'
                                                ? (passReg.current.type =
                                                      'text')
                                                : (passReg.current.type =
                                                      'password')
                                        }
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
                                    type="password"
                                    value={registerObject.repeatedPass}
                                    onChange={(e) => {
                                        const updateOpject = {
                                            ...registerObject,
                                        };
                                        updateOpject.repeatedPass =
                                            e.target.value;
                                        setRegisterObject(updateOpject);
                                    }}
                                    ref={passRepeatReg}
                                    required
                                />
                                {registerObject.repeatedPass.length > 2 && (
                                    <img
                                        onClick={() =>
                                            passRepeatReg?.current.type ===
                                            'password'
                                                ? (passRepeatReg.current.type =
                                                      'text')
                                                : (passRepeatReg.current.type =
                                                      'password')
                                        }
                                        className="eye"
                                        src={imgPassRepeatReg}
                                        alt="eye"
                                        width="30"
                                        loading="lazy"
                                    />
                                )}
                                <label htmlFor="">Repite la contraseña</label>
                            </div>
                            <button
                                type="submit"
                                className="btn text-white bg-slate-700 hover:bg-slate-600 flex justify-center items-center"
                            >
                                {loading ? <LoaderSpinner /> : 'Entra'}
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
                        <form action="" onSubmit={loginSubmit}>
                            <h2 className="text-white">Login</h2>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    type="text"
                                    className="border border-slate-600"
                                    value={loginObject.email}
                                    onChange={(e) => {
                                        const updateOpject = {
                                            ...loginObject,
                                        };
                                        updateOpject.email = e.target.value;
                                        setLoginObject(updateOpject);
                                    }}
                                    required
                                />

                                <label htmlFor="">Email</label>
                            </div>
                            <div className="input-group md:w-[320px] w-[220px]">
                                <input
                                    className="border border-slate-600"
                                    type="password"
                                    value={loginObject.password}
                                    onChange={(e) => {
                                        const updateOpject = {
                                            ...loginObject,
                                        };
                                        updateOpject.password = e.target.value;
                                        setLoginObject(updateOpject);
                                    }}
                                    ref={passLog}
                                    required
                                />
                                {loginObject.password.length > 2 && (
                                    <img
                                        onClick={() =>
                                            passLog.current.type === 'password'
                                                ? (passLog.current.type =
                                                      'text')
                                                : (passLog.current.type =
                                                      'password')
                                        }
                                        className="eye"
                                        src={
                                            passLog?.current.type === 'password'
                                                ? EYECLOSE
                                                : EYEOPEN
                                        }
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
                            <button
                                type="submit"
                                className="btn text-white bg-slate-700 hover:bg-slate-600 flex justify-center items-center"
                                disabled={loading}
                                onClick={loginSubmit}
                            >
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
