import { useState } from 'react';
import { uploadImages } from '../../services/fetchData';
import { toast } from 'react-toastify';

export default function UploadImages() {
    const [file, setFile] = useState();
    const [type, setType] = useState('imagen');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return toast.error('Tienes que seleccionar una imagen');
        const formData = new FormData();
        formData.append('image', file);
        const upload = await uploadImages(formData);
        if (upload.status === 'ok') {
            toast.success(upload.message);
        } else {
            toast.error(upload.message);
        }
    };
    return (
        <div className="w-full h-full flex justify-center items-center">
            <form className="mt-20 bg-slate-800 border border-slate-600 rounded-lg p-10 w-96 text-white flex flex-col justify-center items-center gap-10">
                <div>
                    <label htmlFor="avatar">Choose a profile picture:</label>

                    <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                <div>
                    <fieldset
                        className="flex flex-col gap-4"
                        onChange={(e) => console.log(e.target.value)}
                    >
                        <div>
                            <input
                                type="radio"
                                id="imagen"
                                name="imagen"
                                value="imagen"
                                checked
                            />
                            <label htmlFor="imagen">Imagen</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="deavatarwey"
                                name="avatar"
                                value="avatar"
                            />
                            <label htmlFor="avatar">Avatar</label>
                        </div>
                    </fieldset>
                </div>
                <button
                    className="bg-slate-800 border border-slate-500 rounded py-4 px-6"
                    onClick={handleSubmit}
                >
                    Subir
                </button>
            </form>
        </div>
    );
}