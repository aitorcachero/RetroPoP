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
            <div className="main-profile-container flex flex-col justify-center items-center w-full">
                <div className="w-full h-12">
                    <LateralBar />
                </div>
                <form>
                    <article className="profile-container">
                        <section className="profile-header">
                            <h2 className="main-profile-title">
                                Editar perfil
                            </h2>
                        </section>
                        <section className="profile-avatar-container flex flex-col md:flex-row">
                            <h4 className="profile-avatar-title">Avatar</h4>
                            <img
                                src={previewUrl ? previewUrl : img}
                                alt="avatar"
                                className="profile-avatar-img"
                            />
                            <div className="conditional-img fle">
                                <label
                                    htmlFor="file-input"
                                    className="custom-file-label"
                                >
                                    <span className="profile-avatar-btn">
                                        Subir imagen
                                    </span>
                                </label>
                                <input
                                    className="custom-file-input"
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={onChangeImg}
                                />{' '}
                            </div>
                        </section>
                        <section className="profile-body-container">
                            <div className="profile-body-name-container">
                                <h4 className="profile-body-name-title">
                                    Nombre de usuario
                                </h4>
                                <input
                                    type="text"
                                    className="input-profile"
                                    value={username && username}
                                    disabled
                                />
                            </div>
                            <div className="profile-body-mail-container">
                                <h4 className="profile-body-mail-title">
                                    Email
                                </h4>
                                <input
                                    type="text"
                                    className="input-profile"
                                    value={email && email}
                                    disabled
                                />
                            </div>

                            <div className="profile-body-bio-container">
                                <h4 className="profile-body-bio-title">Bio</h4>
                                <textarea
                                    onChange={(e) => setBio(e.target.value)}
                                    value={bio && bio}
                                    className="profile-body-bio-input"
                                    rows="5"
                                ></textarea>
                            </div>
                        </section>
                        <section className="profile-footer">
                            <button
                                onClick={handleDeleteUser}
                                className="profile-footer-btn-delete"
                            >
                                Borrar perfil
                            </button>
                            {showPopUp && (
                                <div className="popup">
                                    <p className="popup-p">
                                        ¿Estás de que quieres eliminar tu
                                        usuario? ¡¡¡Esta acción no se puede
                                        deshacer!!!
                                    </p>
                                    <button
                                        onClick={confirmDelete}
                                        className="popup-button"
                                    >
                                        Confirmar
                                    </button>
                                    <button
                                        onClick={cancelDelete}
                                        className="popup-button"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            )}
                            <button
                                onClick={handleUpdateProfile}
                                type="Submit"
                                className="profile-footer-btn-save"
                            >
                                Guardar cambios
                            </button>
                        </section>
                    </article>
                </form>
            </div>
        )
    );
}
