import './ReviewCard.css';
import { productPropTypes } from '../../utils/customPropTypes.js';
import { APIUrl } from '../../config';
import StarsReview from '../StarsReview/StarsReview';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { newReviewService } from '../../services/fetchData';
import useAuth from '../../hooks/useAuth';
import { buttonStyle } from '../../utils/const.js';

export default function ReviewCard({ image, productName, resno }) {
    const [stars, setStars] = useState(null);

    const { authToken } = useAuth();

    // const handleStars = (e) => {
    //     e.preventDefault();
    //     const btn = document.querySelector('.valoracion');
    //     const num = e.target.getAttribute('value');
    //     btn.console.log(e.target.getAttribute('value'));
    //     setStars(e.target.getAttribute('value'));
    // };

    const navigate = useNavigate();

    const handleSubmitReview = async (e) => {
        try {
            e.preventDefault();
            if (e.target[0].value === '') {
                return toast.error('Debes escribir un título para la reseña');
            }
            if (e.target[1].value === '') {
                return toast.error('Debes escribir un comentario');
            }
            if (e.target[2].value === '') {
                return toast.error('Debes seleccionar una  puntuación');
            }
            const titleRw = e.target[0].value;
            const textRw = e.target[1].value;
            const starsRw = e.target[2].value;
            const review = await newReviewService(
                titleRw,
                textRw,
                starsRw,
                resno,
                authToken
            );
            toast.success('Reseña publicada');
            navigate(`/`);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="review-card-container">
            <article className="review-card flex flex-col md:flex-row p-10  md:gap-10 md:w-[800px] bg-slate-900 shadow-black shadow-xl border border-slate-600">
                <section className="review-card__image-container border border-slate-600 shadow-xl shadow-black">
                    <img
                        className="review-card__image "
                        src={`${APIUrl}/images/${image}`}
                        alt="review"
                        loading="lazy"
                    />
                </section>
                <section className="review-card__info md:w-1/2 w-full">
                    <form
                        className="review-card__form w-full"
                        onSubmit={handleSubmitReview}
                    >
                        <h3 className="review-card__name">{productName}</h3>
                        <input
                            type="text"
                            className="review-title w-full rounded-xl text-base p-2 bg-slate-800 border border-slate-600 text-white"
                            placeholder="Titulo de la reseña"
                        />

                        <textarea
                            className="review-text w-full rounded-xl md:h-40 text-base min-h-20 bg-slate-800 border border-slate-600 text-slate-400"
                            placeholder="Escribe tu reseña"
                        />

                        <select
                            className="stars-select w-full rounded-xl text-base p-2 bg-slate-800 border border-slate-600 text-white"
                            name="stars"
                            id="stars"
                        >
                            <option value="">Valoración</option>
                            <option value="1">★</option>
                            <option value="2">★★</option>
                            <option value="3">★★★</option>
                            <option value="4">★★★★</option>
                            <option value="5">★★★★★</option>
                        </select>
                        <div className="h-12 w-full md:h-auto">
                            <button
                                className={`${buttonStyle} h-full md:h-auto`}
                                // onClick={handleStars}
                            >
                                Publicar
                            </button>
                        </div>
                    </form>
                </section>
            </article>
        </div>
    );
}

ReviewCard.PropTypes = {
    product: productPropTypes,
};
