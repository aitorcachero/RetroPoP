import './MainTitle.css';

export default function MainTitle() {
    return (
        <article className="flex flex-col justify-center items-center h-[150px] m-20 gap-20">
            <h2 className="main-title text-4xl md:text-[4rem]">
                EL FUTURO DE AYER{' '}
            </h2>
            <h3 className="main-title__subtitle text-4xl md:text-[4rem]">
                en tus manos hoy
            </h3>
        </article>
    );
}
