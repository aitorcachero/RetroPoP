import './ProductCreateForm.css';

// importamos los hooks necesarios
import { useRef, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

// importamos funciones utilitarias que permite previsualizar y eliminar una imagen.
import { handleAddFilePreview } from '../../utils/handleAddFilePreview.js';

// importamos el componente toast de la librería react-toastify
import { toast } from 'react-toastify';
import { buttonStyle } from '../../utils/const.js';

// Definición del componente ProductCreateForm.
const ProductCreateForm = () => {
    const fileInputRef = useRef(null);

    // Importa la función addProduct del hook useProducts
    const { addProduct } = useProducts();

    // Utilización de useState para definir varios estados del componente

    const [img, setImg] = useState(null); // almacena la imagen
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState(''); // almacena el contenido
    const [category, setCategory] = useState('');
    const [state, setState] = useState('');
    const [place, setPlace] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null); // Almacena el archivo de imagen seleccionado
    const [previewUrl, setPreviewUrl] = useState(''); // Almacena la url de la previsualización de la imagen
    const [loading, setLoading] = useState(false); // indica si el formulario se esta procesando enviando datos

    // Función que crea un producto
    // Esta función se encarga de crear un producto cuando se envía el formulario.

    const navigate = useNavigate();

    const onChangeImg = (e) => {
        setImg(e.target.value);
        handleAddFilePreview(e, setFile, setPreviewUrl);
    };

    const handleClearFields = (e) => {
        e.preventDefault();
        setProductName('');
        setDescription('');
        setCategory('');
        setState('');
        setPlace('');
        setPrice('');
        setFile(null);
        setPreviewUrl('');
        setImg(null);
    };

    const handleProductCreate = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!img)
            return toast.error('Tienes que adjuntar una imagen del producto');
        // try {
        setLoading(true);

        // Creamos un objeto FormData y establecemos sus propiedades. Adjuntamos los estados al formData
        // con append agregamos un nuevo campo y su valor al objeto fromData

        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('state', state);
        formData.append('place', place);
        formData.append('price', price);

        // Si existe una imagen la asignamos también.
        if (file) formData.append('image', file);

        const uploadProduct = await addProduct(formData);
        if (uploadProduct.status === 'error') {
            toast.error(uploadProduct.message);
            setLoading(false);
        } else {
            navigate('/');
            toast.success('Producto creado correctamente');
        }
    };
    // Renderizado del formulario y elementos de la interfaz del usuario
    return (
        <div className="product-create-form-container w-full h-full">
            <form
                className="flex flex-col justify-center items-center gap-4 p-6 my-10 bg-slate-900 shadow-xl shadow-black border border-slate-700 md:px-20"
                onSubmit={handleProductCreate}
            >
                <header className="title-upload-product">
                    <h2 className="title-upload font-bold text-4xl">
                        Sube tu producto
                    </h2>
                </header>
                <div className="flex flex-row justify-between text-xs md:text-base md: gap-10 ">
                    <section className="product-create-form__left text-start">
                        <h4 className="product-create-form__title">
                            Nombre del producto
                        </h4>
                        <h4 className="product-create-form__title ">
                            Categoría
                        </h4>
                        <h4 className="product-create-form__title">Estado</h4>
                        <h4 className="product-create-form__title">
                            Localidad
                        </h4>
                        <h4 className="product-create-form__title">Precio</h4>
                    </section>
                    <main className="product-create-form__main">
                        <input
                            className="rounded-lg p-2 outline-none w-full  md:w-[250px]"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            maxLength="150"
                            autoFocus
                            required
                            placeholder="Nombre del Producto"
                        />

                        <div className="select-container">
                            {/* <label htmlFor="category-select">Categoría:</label> */}
                            <select
                                className="rounded-lg p-2 outline-none w-full md:w-[250px]"
                                id="category-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="" defaultValue>
                                    Selecciona una categoría
                                </option>
                                <option value="Audio">Audio</option>
                                <option value="Cámaras de fotos">
                                    Cámaras de fotos
                                </option>
                                <option value="Consolas">Consolas</option>
                                <option value="Juguetes">Juguetes</option>
                                <option value="Máquinas de escribir">
                                    Máquinas de escribir
                                </option>
                                <option value="Ordenadores">Ordenadores</option>
                                <option value="Relojes">Relojes</option>
                                <option value="Teléfonos">Teléfonos</option>
                                <option value="Televisores">Televisores</option>
                                <option value="Video">Video</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>
                        <select
                            className="rounded-lg p-2 outline-none w-full md:w-[250px]"
                            id="state-select"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        >
                            <option value="" defaultValue>
                                Selecciona estado
                            </option>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Como nuevo">Como nuevo</option>
                            <option value="En buen estado">
                                En buen estado
                            </option>
                            <option value="En condiciones aceptables">
                                En condiciones aceptables
                            </option>
                            <option value="No funciona">No funciona</option>
                        </select>
                        <input
                            className="rounded-lg p-2 outline-none w-full md:w-[250px]"
                            type="text"
                            value={place}
                            maxLength="30"
                            onChange={(e) => setPlace(e.target.value)}
                            placeholder="Localidad"
                            required
                        />
                        <input
                            type="number"
                            value={price}
                            step="0.01"
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            placeholder="Precio"
                            required
                            className="rounded-lg p-2 outline-none w-full md:w-[250px]"
                        />
                    </main>
                </div>

                <section className="w-full">
                    <textarea
                        className="w-full min-h-24 outline-none rounded resize-none p-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength="200"
                        autoFocus
                        required
                        placeholder="Descripción"
                    />
                </section>
                <div className="">
                    {previewUrl && (
                        <div className="conditional-img rounded-xl">
                            <label
                                htmlFor="file-input"
                                className="custom-file-label rounded-xl"
                            >
                                <span className="span-img rounded-xl">
                                    <img
                                        className="cursor-pointer w-[200px] rounded-xl h-auto"
                                        src={previewUrl}
                                        alt="Previsualización"
                                        title="Eliminar imagen"
                                        loading="lazy"
                                    />
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
                    )}
                    {!img ? (
                        <div className="conditional-img">
                            <label
                                htmlFor="file-input"
                                className="custom-file-label"
                            >
                                <span className="span-img">
                                    <img
                                        className="img-upload"
                                        src="/icons/folder.png"
                                        alt="upload"
                                        width="150"
                                        style={{ cursor: 'pointer' }}
                                        loading="lazy"
                                    />
                                </span>
                                <span className="span-text-img">
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
                    ) : null}
                </div>
                <footer className="product-create-form__footer">
                    <button className={buttonStyle} onClick={handleClearFields}>
                        Borrar
                    </button>
                    <button className={buttonStyle} disabled={loading}>
                        Enviar
                    </button>
                </footer>
            </form>
        </div>
    );
};

// Exportación del componente ProductCreateForm
export default ProductCreateForm;
