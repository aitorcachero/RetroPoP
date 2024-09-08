export default function UploadImages() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <form className="mt-20 bg-white border border-slate-600 rounded-lg p-10 w-96 text-white flex flex-row">
                <label
                    htmlFor="file-input"
                    className="custom-file-label rounded-xl"
                >
                    <span className="span-img rounded-xl"></span>
                </label>
                <input className="w-96" type="file" accept="image/*" />
                <button className="bg-slate-800 border border-slate-500 rounded py-4 px-6">
                    Subir
                </button>
            </form>
        </div>
    );
}
