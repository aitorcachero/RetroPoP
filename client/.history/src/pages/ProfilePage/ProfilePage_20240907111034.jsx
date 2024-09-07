import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth.js'; // Importa el hook personalizado de autenticación.
import { deleteUserService } from '../../services/fetchData.js'; // Importa el servicio para editar datos de usuario.
import './ProfilePage.css'; // Importa los estilos de la página.
import { APIUrl } from '../../config.js'; // Importa la URL de la API.
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';
import LateralBar from '../../components/LateralBar/LateralBar.jsx';
import { buttonStyle } from '../../utils/const.js';

export default function ProfilePage() {
    const fileInputRef = useRef(null);
    // Obtiene datos de usuario y función para actualizar el perfil desde el hook de autenticación.
    const { authUser, authUpdateProfile, authToken, authLogout } = useAuth();
    // Configura estados iniciales para username, email, bio y avatar con datos del usuario.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState(''); // Si no hay bio, establece una cadena vacía.
    const [avatar, setAvatar] = useState(null); // Inicializa el avatar como nulo.
    const [img, setImg] = useState(avatar); // Inicializa el estado para la imagen como cadena vacía.
    const [showPopUp, setShowPopUp] = useState(false); // Inicializa el estado para mostrar el popup como falso.
    const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualiza
    const navigate = useNavigate();

    // Efecto para actualizar estados cuando cambia el usuario.
    useEffect(() => {
        if (authUser) {
            setUsername(authUser.username);
            setEmail(authUser.email);
            setBio(authUser.bio || '');
            authUser.avatar
                ? setImg(`${APIUrl}/avatars/${authUser.avatar}`)
                : setImg('/icons/user-profile.png');
        }
    }, [authUser]);

    // Si el usuario no está logeado redirigimos a la página principal.
    if (!authUser) return <Navigate to="/" />;

    // Función para actualizar el perfil del usuario.
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        // Validación de campos obligatorios.
        if (!username.trim() || !email.trim()) {
            return toast.error(
                'Por favor, completa todos los campos obligatorios.'
            );
        }

        // Creación de un objeto FormData para enviar los datos del formulario.
        const formData = new FormData();
        formData.append('bio', bio);

        // Si se proporciona un nuevo avatar, lo adjunta al formulario.
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            // Llama a la función para actualizar el perfil de autenticación del usuario.

            await authUpdateProfile(formData);
        } catch (error) {
            toast.error('Error al actualizar el perfil');
        }
    };

    const onChangeImg = (e) => {
        // setImg(e.target.value);
        handleAddFilePreview(e, setAvatar, setPreviewUrl);
    };

    const confirmDelete = async (e) => {
        e.preventDefault();

        try {
            await deleteUserService(authToken);
            authLogout();
            toast.success('Usuario borrado con éxito');
            navigate('/');
        } catch (error) {
            toast.error('Error al borrar el usuario');
        }
    };

    const cancelDelete = (e) => {
        e.preventDefault();
        setShowPopUp(false);
    };

    const handleDeleteUser = (e) => {
        e.preventDefault();

        if (!authToken) {
            toast.error('Debes estar logueado para borrar tu usario');
            return navigate('/login');
        }
        setShowPopUp(true);
    };

    return (
        authUser && (
            <div className="flex flex-col justify-center items-center w-full ">
                <div className="w-full h-12 ">
                    <LateralBar />
                </div>
                <div className=" p-4 flex flex-col justify-center items-center w-full">
                    <form
                        className="mt-4 flex flex-col justify-start items-center bg-[#ffffffb7] border border-slate-600 rounded-xl py-10 md:p-10 mb-12 gap-4 w-full md:w-[800px] bg-slate-950 text-white"
                        style={{
                            background:
                                'linear-gradient(71deg, #080509, #1a171c, #080509)',
                            backgroundClip: 'padding-box',
                        }}
                    >
                        <h2 className="text-slate-700 font-extrabold text-2xl md:text-5xl ">
                            Editar perfil
                        </h2>

                        <section className="profile-avatar-container flex flex-col md:flex-row p-4 gap-4 border border-slate-600 bg-slate-900">
                            <h4 className="profile-avatar-title">Avatar</h4>
                            <img
                                src={previewUrl ? previewUrl : img}
                                alt="avatar"
                                className="profile-avatar-img w-24 h-24"
                            />
                            <div className="conditional-img fle h-12">
                                <label
                                    htmlFor="file-input"
                                    className="custom-file-label h-12 cursor-pointer p-2"
                                >
                                    <span className={buttonStyle}>
                                        Subir imagen
                                    </span>
                                </label>
                                <input
                                    className="custom-file-input h-12"
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={onChangeImg}
                                />{' '}
                            </div>
                        </section>
                        <section className="flex flex-col w-4/5 gap-4">
                            <div className="profile-body-name-container flex flex-col md:flex-row gap-2 w-full">
                                <h4 className="profile-body-name-title font-bold">
                                    Nombre de usuario
                                </h4>
                                <input
                                    type="text"
                                    className="rounded-lg h-12 border  text-center w-full md:w-96 bg-slate-800 border-slate-600 "
                                    value={username && username}
                                    disabled
                                />
                            </div>
                            <div className="profile-body-mail-container flex flex-col md:flex-row">
                                <h4 className="profile-body-mail-title font-bold">
                                    Email
                                </h4>
                                <input
                                    type="text"
                                    className="rounded-lg h-12 border w-full md:w-96 border-slate-600 text-center bg-slate-800"
                                    value={email && email}
                                    disabled
                                />
                            </div>

                            <div className="profile-body-bio-container flex flex-col md:gap-4">
                                <h4 className="profile-body-bio-title font-bold">
                                    Bio
                                </h4>
                                <textarea
                                    onChange={(e) => setBio(e.target.value)}
                                    value={bio && bio}
                                    className="profile-body-bio-input w-full bg-slate-700 border-slate-600"
                                    rows="5"
                                ></textarea>
                            </div>
                        </section>
                        <section className="text-sm md:text-base mt-10 flex justify-center gap-4 md:w-4/5">
                            <button
                                onClick={handleDeleteUser}
                                className={buttonStyle}
                            >
                                Borrar perfil
                            </button>
                            {showPopUp && (
                                <div className="popup min-w-[350px] bg-slate-900 p-6">
                                    <p className="popup-p text-white font-bold">
                                        ¿Estás de que quieres eliminar tu
                                        usuario? ¡¡¡Esta acción no se puede
                                        deshacer!!!
                                    </p>
                                    <div className="flex flex-row gap-4 ">
                                        <button
                                            onClick={confirmDelete}
                                            className={buttonStyle}
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            onClick={cancelDelete}
                                            className={buttonStyle}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={handleUpdateProfile}
                                type="Submit"
                                className={buttonStyle}
                            >
                                Guardar cambios
                            </button>
                        </section>
                    </form>
                </div>
            </div>
        )
    );
}
