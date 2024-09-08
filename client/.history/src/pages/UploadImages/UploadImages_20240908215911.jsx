import React from 'react';

export default function UploadImages() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <form className="mt-20 bg-slate-900 border border-slate-600 rounded-lg p-10 w-96">
                <input type="file" />
                <button>Subir</button>
            </form>
        </div>
    );
}
