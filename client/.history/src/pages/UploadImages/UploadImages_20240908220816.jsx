import { useState } from 'react';

export default function UploadImages() {
    const [file, setFile] = useState();

    const handleSubmit = () => {
        console.log(files);
    };
    return (
        <div className="w-full h-full flex justify-center items-center">
            <form className="mt-20 bg-slate-800 border border-slate-600 rounded-lg p-10 w-96 text-white flex flex-row">
                <label htmlFor="avatar">Choose a profile picture:</label>

                <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files)}
                />
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
